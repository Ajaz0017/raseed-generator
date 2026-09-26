import { useCallback, useEffect, useState } from 'react';
import PinGate from './components/PinGate';
import CustomerForm from './components/CustomerForm';
import BillForm from './components/BillForm';
import ItemsList from './components/ItemsList';
import BillPrint from './components/BillPrint';
import ConfirmDialog from './components/ConfirmDialog';
import BottomSheet from './components/BottomSheet';
import { useItems } from './hooks/useItems';
import { useCustomer } from './hooks/useCustomer';
import { useMediaQuery } from './hooks/useMediaQuery';
import { UNLOCK_KEY } from './constants';
import './index.css';
import './print.css';

const pad = (n) => String(n).padStart(2, '0');

// "waseem-designer-mohammad-hakeem-26-09-2026-10-45" — browsers use
// document.title as the default "Save as PDF" file name. Customer name and
// print time keep same-day bills from overwriting each other.
function pdfFileName(customer) {
  const date = customer?.date ? new Date(`${customer.date}T00:00:00`) : new Date();
  const now = new Date();
  const customerSlug = (customer?.name ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return [
    'waseem-designer',
    customerSlug,
    `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`,
    `${pad(now.getHours())}-${pad(now.getMinutes())}`,
  ]
    .filter(Boolean)
    .join('-');
}

function App() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(UNLOCK_KEY) === 'true');
  const { items, addItem, updateItem, deleteItem, clearAll } = useItems();
  const { customer, updateCustomer, clearCustomer } = useCustomer();
  const [editingItem, setEditingItem] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [sheetOpen, setSheetOpen] = useState(false);

  const closeSheet = useCallback(() => {
    setSheetOpen(false);
    setEditingItem(null);
  }, []);

  function handleAdd(item) {
    addItem(item);
    setSheetOpen(false);
  }

  // Swap the tab title only while printing (covers the button and Ctrl+P).
  useEffect(() => {
    const originalTitle = document.title;
    const setPdfTitle = () => {
      document.title = pdfFileName(customer);
    };
    const restoreTitle = () => {
      document.title = originalTitle;
    };
    window.addEventListener('beforeprint', setPdfTitle);
    window.addEventListener('afterprint', restoreTitle);
    return () => {
      window.removeEventListener('beforeprint', setPdfTitle);
      window.removeEventListener('afterprint', restoreTitle);
    };
  }, [customer]);

  function handleUnlock() {
    sessionStorage.setItem(UNLOCK_KEY, 'true');
    setUnlocked(true);
  }

  function handleUpdate(id, updated) {
    updateItem(id, updated);
    setEditingItem(null);
  }

  function requestDelete(item) {
    setPendingAction({ type: 'delete', id: item.id, label: item.item });
  }

  function requestClearAll() {
    setPendingAction({ type: 'clear' });
  }

  function requestClearCustomer() {
    setPendingAction({ type: 'clearCustomer' });
  }

  function confirmPendingAction() {
    if (pendingAction?.type === 'delete') {
      deleteItem(pendingAction.id);
      setEditingItem((current) => (current?.id === pendingAction.id ? null : current));
    } else if (pendingAction?.type === 'clear') {
      clearAll();
      setEditingItem(null);
    } else if (pendingAction?.type === 'clearCustomer') {
      clearCustomer();
    }
    setPendingAction(null);
  }

  const dialogCopy = {
    delete: {
      title: 'Delete this item?',
      message: `"${pendingAction?.label}" ko list se hamesha ke liye hataya jayega.`,
      confirmLabel: 'Delete',
    },
    clear: {
      title: 'Clear all items?',
      message: 'Poori list khali ho jayegi. Ye action wapas nahi ho sakta.',
      confirmLabel: 'Clear All',
    },
    clearCustomer: {
      title: 'Clear customer details?',
      message: 'Name, Address aur Phone No teeno khali ho jayenge.',
      confirmLabel: 'Clear',
    },
  }[pendingAction?.type] ?? {};

  const totalLabel = items
    .reduce((sum, it) => sum + (parseFloat(it.amount) || 0), 0)
    .toLocaleString('en-IN', { maximumFractionDigits: 2 });

  if (!unlocked) {
    return <PinGate onUnlock={handleUnlock} />;
  }

  return (
    <div className="app">
      <div className="app-screen no-print">
        <header className="app-header">
          <h1>Bill Generator</h1>
          <div className="header-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={requestClearAll}
              disabled={items.length === 0}
            >
              Clear All
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => window.print()}
              disabled={items.length === 0}
            >
              Print Bill
            </button>
          </div>
        </header>

        {isMobile ? (
          <>
            <CustomerForm
              customer={customer}
              onChange={updateCustomer}
              onClear={requestClearCustomer}
              collapsible
            />

            <div className="items-section-header">
              <h2>
                Items :<span className="items-count">{items.length}</span>
              </h2>
              {items.length > 0 && <span className="items-total">Total ₹{totalLabel}</span>}
            </div>

            <ItemsList items={items} onEdit={setEditingItem} onDelete={requestDelete} />

            <div className="fab-bar">
              <button type="button" className="btn btn-primary fab" onClick={() => setSheetOpen(true)}>
                <span aria-hidden="true">+</span> Add Item
              </button>
            </div>

            <BottomSheet
              open={sheetOpen || editingItem !== null}
              title={editingItem ? 'Edit Item' : 'Add Item'}
              onClose={closeSheet}
            >
              <BillForm
                onAdd={handleAdd}
                onUpdate={handleUpdate}
                editingItem={editingItem}
                onCancelEdit={closeSheet}
              />
            </BottomSheet>
          </>
        ) : (
          <>
            <CustomerForm customer={customer} onChange={updateCustomer} onClear={requestClearCustomer} />

            <BillForm
              onAdd={addItem}
              onUpdate={handleUpdate}
              editingItem={editingItem}
              onCancelEdit={() => setEditingItem(null)}
            />

            <ItemsList items={items} onEdit={setEditingItem} onDelete={requestDelete} />
          </>
        )}
      </div>

      <div className="print-only">
        <BillPrint items={items} customer={customer} />
      </div>

      <ConfirmDialog
        open={pendingAction !== null}
        title={dialogCopy.title}
        message={dialogCopy.message}
        confirmLabel={dialogCopy.confirmLabel}
        onConfirm={confirmPendingAction}
        onCancel={() => setPendingAction(null)}
      />
    </div>
  );
}

export default App;

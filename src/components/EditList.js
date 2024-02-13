import { MdAddShoppingCart } from "react-icons/md";

export const EditList = ({
  AddItem,
  ToggleListIsEditing,
  list,
  listBeingEdited,
  newItemText,
  cancelAddItem,
  setNewItemText,
}) => {
  return (
    <li className="edit-list">
      <MdAddShoppingCart
        size="24"
        onClick={() => {
          ToggleListIsEditing(list);
        }}
      />
      {list.id === listBeingEdited && (
        <form id="form-add-item" onSubmit={AddItem}>
          <input
            autoFocus
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add item"
          />
          <button type="submit">Add</button>
          <button type="reset" onClick={cancelAddItem}>
            Cancel
          </button>
        </form>
      )}
    </li>
  );
};

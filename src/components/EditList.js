import { RiPlayListAddLine } from "react-icons/ri";

export const EditList = ({
  AddItem,
  toggleListEditing,
  list,
  listBeingEdited,
  newItemText,
  cancelAddItem,
  setNewItemText,
}) => {
  return (
    <li className="edit-list">
      <RiPlayListAddLine
        title={`Add a new item to ${list.store}`}
        size="24"
        onClick={() => {
          toggleListEditing(list);
        }}
      />
      {list.id === listBeingEdited && (
        <form id="form-add-item" onSubmit={AddItem}>
          <input
            autoFocus
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder={`Add a new item to ${list.store}`}
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

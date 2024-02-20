import { MdAddShoppingCart } from "react-icons/md";

export const Header = ({
  ToggleAddList,
  AddList,
  addingList,
  newListTitle,
  setNewListTitle,
  cancelAddList,
}) => {
  return (
    <>
      <h1>
        Shopping lists
        <MdAddShoppingCart
          id="icon-add-list"
          size="24"
          title="Add a new list"
          onClick={ToggleAddList}
        />
      </h1>
      {addingList && (
        <form
          id="form-add-list"
          onSubmit={AddList}
          className={addingList ? "active" : ""}
        >
          <input
            autoFocus
            type="text"
            name="list-name"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            placeholder="Add a new list"
          />
          <button type="submit">Save</button>
          <button type="reset" onClick={cancelAddList}>
            Cancel
          </button>
        </form>
      )}
    </>
  );
};

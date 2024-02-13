import { RiPlayListAddLine } from "react-icons/ri";

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
        <RiPlayListAddLine
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

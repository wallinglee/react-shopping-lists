import { Lists } from "./Lists";

export const ListsWrapper = ({
  lists,
  listBeingEdited,
  toggleItemComplete,
  toggleListComplete,
  deleteItem,
  toggleListEditing,
  setNewItemText,
  cancelAddItem,
  AddItem,
  newItemText,
  deleteList,
  resetList,
  listIsResettable,
  toggleList,
  expandedLists
}) => {
  return (
    <ul id="shopping-lists">
      {lists.map((list) => (
        <Lists
          key={list.id}
          list={list}
          listBeingEdited={listBeingEdited}
          toggleItemComplete={toggleItemComplete}
          toggleListComplete={toggleListComplete}
          deleteItem={deleteItem}
          toggleListEditing={toggleListEditing}
          setNewItemText={setNewItemText}
          cancelAddItem={cancelAddItem}
          AddItem={AddItem}
          newItemText={newItemText}
          deleteList={deleteList}
          resetList={resetList}
          listIsResettable={listIsResettable}
          toggleList={toggleList}
          expandedLists={expandedLists}
        />
      ))}
    </ul>
  )
}

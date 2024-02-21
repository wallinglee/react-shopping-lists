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
          toggleList={toggleList}
          expandedLists={expandedLists}
        />
      ))}
    </ul>
  )
}

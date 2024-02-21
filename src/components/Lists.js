import { ListItem } from "./ListItem";
import { EditList } from "./EditList";
import { CiSquareRemove, CiSquarePlus, CiSquareMinus } from "react-icons/ci";

export const Lists = ({
  toggleItemComplete,
  toggleListComplete,
  list,
  deleteItem,
  listBeingEdited,
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
    <li key={list.id} draggable>
      <h3 className={"list-name" + (expandedLists.includes(list.id) ? " expanded" : "") + (list.completed ? " completed" : "")}>
        <span>
          <strong
            onClick={() => {
              toggleListComplete(list);
            }}
          >
            {list.store}
          </strong>
          {list.completed && (
            <CiSquareRemove
              className="icon-remove-list"
              title={`Delete ${list.store}`}
              size="24"
              onClick={() => {
                deleteList(list);
              }}
            />
          )}
        </span>
        <span>
          {expandedLists.includes(list.id) ? (
            <CiSquareMinus
              className="icon-expand-list"
              size="24"
              onClick={() => {
                toggleList(list);
              }}
            />
          ) : (
            <CiSquarePlus
              className="icon-expand-list"
              size="24"
              onClick={() => {
                toggleList(list);
              }}
            />
          )}
        </span>
      </h3>
      {expandedLists.includes(list.id) && (
        <ul>
          {list.items.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              toggleItemComplete={toggleItemComplete}
              deleteItem={deleteItem}
              list={list}
            />
          ))}
          <EditList
            list={list}
            listBeingEdited={listBeingEdited}
            toggleListEditing={toggleListEditing}
            AddItem={AddItem}
            newItemText={newItemText}
            cancelAddItem={cancelAddItem}
            setNewItemText={setNewItemText}
          />
        </ul>
      )}
    </li>
  );
};

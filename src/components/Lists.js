import { ListItem } from "./ListItem";
import { EditList } from "./EditList";
import { CiSquareRemove, CiSquarePlus, CiSquareMinus } from "react-icons/ci";

export const Lists = ({
  toggleComplete,
  toggleListComplete,
  list,
  removeItem,
  listBeingEdited,
  ToggleListIsEditing,
  setNewItemText,
  cancelAddItem,
  AddItem,
  newItemText,
  removeList,
  toggleList,
}) => {
  return (
    <li key={list.id}>
      <h3 className={"list-name" + (list.expanded ? " expanded" : "") + (list.completed ? " completed" : "")}>
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
              size="24"
              onClick={() => {
                removeList(list);
              }}
            />
          )}
        </span>
        <span>
          {list.expanded ? (
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
      {list.expanded && (
        <ul>
          {list.items.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              toggleComplete={toggleComplete}
              removeItem={removeItem}
              list={list}
            />
          ))}
          <EditList
            list={list}
            listBeingEdited={listBeingEdited}
            ToggleListIsEditing={ToggleListIsEditing}
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

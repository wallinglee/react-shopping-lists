import { ListItem } from "./ListItem";
import { EditList } from "./EditList";
import { CiSquareRemove } from "react-icons/ci";
import { MdAddShoppingCart } from "react-icons/md";

export const Lists = ({
  toggleComplete,
  toggleEditingItem,
  list,
  removeItem,
  listBeingEdited,
  ToggleListIsEditing,
  setNewItemText,
  cancelAddItem,
  AddItem,
  newItemText,
  removeList,
}) => {
  return (
    <li key={list.id}>
      <h3 className="list-name">
        {list.store}
        <CiSquareRemove
          className="icon-remove-list"
          size="20"
          onClick={() => {
            removeList(list);
          }}
        />
      </h3>
      <ul>
        {list.items.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            toggleComplete={toggleComplete}
            toggleEditingItem={toggleEditingItem}
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
    </li>
  );
};

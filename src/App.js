import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Lists } from "./components/Lists";
import defaultShoppingLists from "./default-shopping-lists";
import "./App.css";

export default function App() {
  const [lists, setLists] = useState(
    JSON.parse(localStorage.getItem("shoppingLists")) || defaultShoppingLists
  );
  const [addingList, setAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [newItemText, setNewItemText] = useState("");
  const [listBeingEdited, setListBeingEdited] = useState(null);

  const ToggleAddList = () => {
    setNewListTitle("");
    setAddingList(addingList ? false : true);
  };

  const AddList = (e) => {
    e.preventDefault();
    const nextID = lists.length ? lists[lists.length - 1].id + 1 : 1;
    if (!newListTitle) {
      setAddingList(false);
      return;
    }
    //
    setLists([
      {
        id: nextID,
        store: newListTitle,
        items: [],
      },
      ...lists,
    ]);
    setNewListTitle("");
    setAddingList(false);
  };

  const AddItem = (e) => {
    e.preventDefault();
    if (!newItemText) {
      setListBeingEdited(null);
      return;
    }

    const newLists = lists.map((list) => {
      if (list.id === listBeingEdited) {
        return { ...list, items: [...list.items, {
          id: list.items.length ? list.items[list.items.length - 1].id + 1 : 1,
          text: newItemText,
          completed: false,
        }] };
      }
      return list;
    });

    setLists(newLists);
    setNewItemText("");
    setListBeingEdited(null);
  };

  const cancelAddList = () => {
    setAddingList(false);
  };

  const cancelAddItem = () => {
    setListBeingEdited(null);
    setNewItemText("");
  };

  const toggleEditingItem = (list, item) => {
    console.log(list);
    console.log(item);
  };

  const toggleComplete = (targetList, id) => {
    const thisList = lists.find((obj) => obj.id === targetList.id);
    const updatedListItems = thisList.items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setLists(
      lists.map((list) =>
        list.id === targetList.id ? { ...list, items: updatedListItems } : list
      )
    );
  };

  const ToggleListIsEditing = (list) => {
    setListBeingEdited(list.id);
    setNewItemText("");
  };

  const removeItem = (item, list) => {
    const updatedItems = list.items.filter((itm) => itm.id !== item.id);

    const newLists = lists.map((obj) => {
      if (obj.id === list.id) {
        return { ...obj, items: updatedItems };
      }
      return obj;
    });

    setLists(newLists);
  };

  const removeList = (list) => {
    const updatedLists = lists.filter((obj) => obj.id !== list.id);
    setLists(updatedLists);
  };

  useEffect(() => {
    localStorage.setItem("shoppingLists", JSON.stringify(lists));
  }, [lists]);

  return (
    <div className="App">
      <Header
        ToggleAddList={ToggleAddList}
        AddList={AddList}
        addingList={addingList}
        newListTitle={newListTitle}
        setNewListTitle={setNewListTitle}
        cancelAddList={cancelAddList}
      />
      {lists && lists.length > 0 ? (
        <ul>
          {lists.map((list) => (
            <Lists
              key={list.id}
              list={list}
              listBeingEdited={listBeingEdited}
              toggleComplete={toggleComplete}
              toggleEditingItem={toggleEditingItem}
              removeItem={removeItem}
              ToggleListIsEditing={ToggleListIsEditing}
              setNewItemText={setNewItemText}
              cancelAddItem={cancelAddItem}
              AddItem={AddItem}
              newItemText={newItemText}
              removeList={removeList}
            />
          ))}
        </ul>
      ) : (
        <div>no lists...</div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { ListsWrapper } from "./components/ListsWrapper";
import "./App.css";

const API_URL = "https://shopping-lists-6vj9.onrender.com/lists/";

export default function App() {
  const [lists, setLists] = useState([]);
  const [addingList, setAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [newItemText, setNewItemText] = useState("");
  const [listBeingEdited, setListBeingEdited] = useState(null);
  const [expandedLists, setExpandedLists] = useState(JSON.parse(localStorage.getItem("expandedLists")) || []);
  const [isLoading, setIsLoading] = useState(true);

  const ToggleAddList = () => {
    setNewListTitle("");
    setAddingList(addingList ? false : true);
  };

  const AddList = (e) => {
    e.preventDefault();
    if (!newListTitle) {
      setAddingList(false);
      return;
    };

    const newList = {
      "store": newListTitle,
      "completed": false,
      "expanded": false,
      "items": []
    };

    fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newList),
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      fetchLists();
    })
    .catch((error) => {
      console.log(error)
    });

    // Reset form 
    setNewListTitle("");
    setAddingList(false);
  };

  const AddItem = (e) => {
    e.preventDefault();
    if (!newItemText) {
      setListBeingEdited(null);
      return;
    }

    const thisList = lists.find((obj) => obj.id === listBeingEdited);
    
    const newItems = [...thisList.items, {
      id: Date.now(),
      text: newItemText,
      completed: false
    }];
    
    const updatedItems = {
      items: newItems
    };
    
    fetch(API_URL + `${listBeingEdited}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(updatedItems),
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      fetchLists();
    })
    .catch((error) => {
      console.log(error)
    });

    // Reset form
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

  const toggleItemComplete = (targetList, itemID) => {
    const thisList = lists.find((obj) => obj.id === targetList.id);
    const updatedListItems = thisList.items.map((item) =>
      item.id === itemID ? { ...item, completed: !item.completed } : item
    );
    updatedListItems.sort((a, b) => a.completed - b.completed || a.id - b.id);
    const updatedItems = {
      items: updatedListItems
    };
    fetch(API_URL + `${targetList.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(updatedItems),
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      fetchLists();
    })
    .catch((error) => {
      console.log(error)
    });
  };

  const toggleListEditing = (list) => {
    setListBeingEdited(listBeingEdited === list.id ? null : list.id);
    setNewItemText("");
  };

  const deleteItem = (item, list) => {
    const filteredItems = list.items.filter((itm) => itm.id !== item.id);
    const updatedItems = {
      items: filteredItems
    };
    fetch(API_URL + `${list.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(updatedItems),
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      fetchLists();
    })
    .catch((error) => {
      console.log(error)
    });
  };

  const deleteList = (list) => {
    const filteredExpanded = expandedLists.filter((item) => item !== list.id);
    setExpandedLists(filteredExpanded);
    localStorage.setItem("expandedLists", JSON.stringify(filteredExpanded));

    fetch(API_URL + `${list.id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      fetchLists();
    })
    .catch((error) => {
      console.log(error)
    });
  };

  const resetList = (list) => {
    const updatedListItems = list.items.map((item) =>
      item.completed === true ? { ...item, completed: false } : item
    );
    updatedListItems.sort((a, b) => a.completed - b.completed || a.id - b.id);
    const updatedItems = {
      items: updatedListItems
    };
    fetch(API_URL + `${list.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(updatedItems),
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      fetchLists();
    })
    .catch((error) => {
      console.log(error)
    });
  };

  const listIsResettable = (list) => {
    let resettable = false;
    list.items.forEach((item) => {
      if(item.completed) resettable = true;
    });
    return resettable;
  };

  const toggleList = (toggledList) => {
    const exists = expandedLists.includes(toggledList.id);
    if(exists){
      const filteredExpanded = expandedLists.filter((item) => item !== toggledList.id);
      setExpandedLists(filteredExpanded);
      localStorage.setItem("expandedLists", JSON.stringify(filteredExpanded));
    } else {
      setExpandedLists([...expandedLists, toggledList.id]);
      localStorage.setItem("expandedLists", JSON.stringify([...expandedLists, toggledList.id]));
    }
  };

  const toggleListComplete = (toggledList) => {
    const completed = {
      completed: !toggledList.completed
    };
    fetch(API_URL + `${toggledList.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(completed),
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      fetchLists();
    })
    .catch((error) => {
      console.log(error)
    });
  };
  
  const fetchLists = () => {
    fetch(API_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLists(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  useEffect(() => {
    fetchLists();
  }, []);

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
      {isLoading && <div>Loading shopping lists...</div>}
      {!isLoading &&
        <>
          {lists && lists.length ? (
            <ListsWrapper
              lists={lists}
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
          ) : (
            <div>No shopping lists to display.</div>
          )}
        </>
      }
    </div>
  );
}

function getCode(obj) {
  let entries = Object.entries(obj);
  let li = document.createElement("li");
  li.innerHTML = entries[0][0];
  if (!Object.keys(entries[0][1])) {
    return li;
  } else {
    let ul = document.createElement("ul");
    let results = [];
    for (let item of Object.entries(entries[0][1]))
      results.push(getCode(Object.fromEntries([item])));
    ul.append(...results);
    li.append(ul);
    return li;
  }
}

function createTree(elem, data) {
  let ul = document.createElement("ul");
  elem.append(ul);
  for (let item of Object.entries(data))
    ul.append(getCode(Object.fromEntries([item])));
}

let container = document.getElementById("container");

createTree(container, data);

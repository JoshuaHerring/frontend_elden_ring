/**
* Fetchs the data from my backend api and returns it
*/
async function getBosses() {
    const response = await fetch("https://project-2-zf2s.onrender.com/bosses");
    const data = await response.json();
    return data;
}

/**
 * I'm lazy and though all the rest of my code in this one big function
 */
async function renderBosses(){
    //stores api data in bosses
    const bosses = await getBosses();

    // You can inspect the browser and view the console tab. There the data is printed out to help you visualize it
    console.log(bosses);

    // gets my html div so I can interact with it and add stuff to it
    let holder = document.getElementById("holder")

    //loops through the boss data wihch is sotred as a large array (look to the console to see all the data logged there)
    bosses.forEach(boss => {

        //creates a ul in order to hold all of the traits to a specific boss and adds a class to it
        const bossHolder = document.createElement("ul");
        bossHolder.classList.add("BossHolder");

        //loops through the different traits of the boss
        for (let key in boss) {

            // if the trait is the id number do nothing
            if (key == "_id"){null}

            // if the key is the name make it a header add the boss name to the html and give it a class then add it to the ul holder
            else if (key == "Name"){
                let bossTrait = document.createElement("h2");
                bossTrait.innerHTML = boss[key];
                bossTrait.classList.add(key);

                bossHolder.append(bossTrait);
            }

            // if the key has a list inside of it do the same thing as the name value but also iterate though the list inside and add all of the list items as individual list items
            else if (typeof(boss[key]) == "object")
            {
                let bossTrait = document.createElement("ul");
                let section = document.createElement("h3");
                section.innerHTML = key;
                section.classList.add("ListHeader")
                bossTrait.classList.add(key);
                bossTrait.classList.add("ListHolder");
                bossTrait.append(section);

                boss[key].forEach(trait =>{
                    let traitElement = document.createElement("li");
                    traitElement.innerHTML = trait;
                    traitElement.classList.add("ListItem");
                    bossTrait.append(traitElement);
                });

                bossHolder.append(bossTrait);
            }

            // if the key is anyting else (all that's left is key value pairs) print them out and give them a class name according to thier key
            else
            {
                let bossTrait = document.createElement("li");
                bossTrait.innerHTML =key + ": " + boss[key];
                bossTrait.classList.add(key);

                bossHolder.append(bossTrait);
            }
        }
        // add the boss we just created to the html file using the div element in the index.html file that we stored in a variable at the begining
        holder.append(bossHolder);
        // add a horiontal line after each boss
        bossHolder.append(document.createElement("hr"));
    });
}

//calls my do everything function
renderBosses();
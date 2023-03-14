async function getBosses() {
    const response = await fetch("https://project-2-zf2s.onrender.com/bosses");
    const data = await response.json();
    return data;
}

async function renderBosses(){
    const bosses = await getBosses();
    let holder = document.getElementById("holder")
    bosses.forEach(boss => {

        const bossHolder = document.createElement("ul");
        bossHolder.classList.add("BossHolder");
        for (let key in boss) {

            if (key == "_id"){null}

            else if (key == "Name"){
                let bossTrait = document.createElement("h2");
                bossTrait.innerHTML = boss[key];
                bossTrait.classList.add(key);

                bossHolder.append(bossTrait);
            }

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

            else
            {
                let bossTrait = document.createElement("li");
                bossTrait.innerHTML =key + ": " + boss[key];
                bossTrait.classList.add(key);

                bossHolder.append(bossTrait);
            }
        }
        holder.append(bossHolder);
        bossHolder.append(document.createElement("hr"));
    });
}

renderBosses();
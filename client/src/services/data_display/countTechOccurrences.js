const countTechOccurrences = (possibleTechNamesArray, techArray) => {

    let counter = {
        occurences: 0,
        projects: []
    }

    techArray.forEach(item => {
        if(possibleTechNamesArray.some(tech => item.technologies.includes(tech))) {
            counter.occurences++;
            counter.projects.push({
                id: item._id,
                name_pl: item.name_pl,
                name_en: item.name_en
            })
        }
    })

    return counter;
}

export default countTechOccurrences;
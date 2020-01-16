var species = []
document.addEventListener("DOMContentLoaded", function(){
    M.AutoInit()
    document.getElementById('landing').scrollIntoView();
    $.getJSON("https://www.fishwatch.gov/api/species", function(r){
        console.log(r)
        species = r
        var data = {}
        r.forEach(function(e){
            data[`${e["Species Name"]} (${e["Scientific Name"]})`] = null
        })
        console.log(data)

        M.Autocomplete.init(document.querySelectorAll('.autocomplete'), {
            data: data,
            onAutocomplete: searchFish
        })
    })
})

function searchFish(){
    console.log("Searched!")
    var found = false
    species.forEach(function(e){
        if(!found && `${e["Species Name"]} (${e["Scientific Name"]})` == document.getElementById('search-input').value){
            found = true
            
            console.log(e)
            document.getElementById('search').classList.add('scale-out')
            document.getElementById('loading-video').classList.remove('scale-out')
            document.querySelectorAll('.detailed-view-name').forEach(function(elem){
                elem.innerHTML = e["Species Name"]
            })
            document.getElementById('spiece-image').src = e['Species Illustration Photo'].src
            document.getElementById('spiece-image').onload = function(){
                var informations = [
                    "Color",
                    "Source",
                    "Taste",
                    "Texture",
                    "Availability"
                ]
                informations.forEach(function(i){
                    console.log(i)
                    if(e[i]){
                        document.getElementById(i+'-text').parentElement.style.display = "block"
                        document.getElementById(i+'-text').innerHTML = e[i].split("<p>").join("").split("</p>").join("")
                    } else {
                        
                        document.getElementById(i+'-text').parentElement.style.display = "none"
                    }
                })
                document.getElementById('search').classList.remove('scale-out')
                document.getElementById('loading-video').classList.add('scale-out')
                document.getElementById('detailed-view').scrollIntoView()
            }
        }
    })

    if(!found){
        M.toast({html: "We couldn't find the speice that you were looking for."})
    }
}

document.getElementById('search').addEventListener("submit", function(e){
    e.preventDefault()
    searchFish()
})

window.addEventListener("resize", function(){
    window.scrollTo(0, 0)
})
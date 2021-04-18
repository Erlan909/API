const API_FOR_GET_ALL_COCKTAILS = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail'
const API_FOR_SEARCH_COCKTAILS_BY_NAME = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const Alkohole = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a'
const API_FOR_DETAIL_BY_ID = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='
const API_FOR_INGRDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?i='


let output = document.getElementById('output')

const searchAlkohol = async (event) => {
    clearOutput()
    // if (event.target.value == 'Alokoholic') {
        const res = await fetch(Alkohole + event.target.value)
        const req = await res.json() 
        console.log(req)
        renderCocktails(req.drinks)

    }



    const clearOutput =()=>{
        output.innerHTML=''
    }
    

    const fetchCocktails = async ()=>{
        clearOutput()
        const res = await fetch(API_FOR_GET_ALL_COCKTAILS)
        const req = await res.json()
        renderCocktails(req.drinks)
    }
    fetchCocktails()
    

    const getAllCocktailByName = async(name)=>{
        clearOutput()
        const res = await fetch(API_FOR_SEARCH_COCKTAILS_BY_NAME+name)
        const req = await res.json()
        renderCocktails(req.drinks)
    }


    const getDetailById=async(id)=>{
        clearOutput()
        const res = await fetch(API_FOR_DETAIL_BY_ID+id)
        const req = await res.json()
        console.log(req.drinks[0])
        renderDetail(req.drinks[0])
    }





    const renderDetail=(cocktail)=>{
        let div = document.createElement('div')
        let img = document.createElement('img')
        let p = document.createElement('p')
        let glass = document.createElement('p')
        let description = document.createElement('p')
        glass.innerHTML='GLass: '+cocktail.strGlass
        description.innerHTML='Description: '+cocktail.strInstructions
        img.src = cocktail.strDrinkThumb
        img.style.width='860px'
        img.style.height='520px'
        img.style.marginLeft='20px'
        img.style.marginTop='20px'
        img.style.borderRadius='5px'
        p.style.fontSize='30px'
        p.style.marginLeft='21px'
        glass.style.fontSize='25px'
        glass.style.marginLeft='21px'
        description.style.marginLeft='21px'
        description.style.fontSize='22px'
        p.innerHTML = cocktail.strDrink 
        
        div.appendChild(img)
        div.appendChild(p)
        div.appendChild(glass)
        div.appendChild(description)
    
        let ingr = 'strIngredient'
        let meas = 'strMeasure'
        for(let i=1; i<=15; i++){
            if(cocktail[ingr+i]!=null && cocktail[meas+i]!=null){
                let property = `Ingredient ${cocktail[ingr+i]} and measure ${cocktail[meas+i]}`
                let h = document.createElement('p')
                h.style.fontSize='20px'
                h.style.marginLeft='21px'
                h.innerHTML=property

                h.addEventListener('click', ()=>{
                    getAllIngridient(cocktail[ingr+i])
                })
                div.appendChild(h)
            }
        }
        output.appendChild(div)
    }
   
    const getAllIngridient = async(name)=>{
        clearOutput()
        const res = await fetch(API_FOR_INGRDIENT +name)
        const req = await res.json()
        console.log(req)
        let div = document.createElement('div')
        let p = document.createElement('b')
        p.innerHTML =req.ingredients[0].strDescription
        div.appendChild(p)
        output.appendChild(div)
    }

    
    const renderCocktails = (cocktails)=>{
        cocktails.map(cocktail=>{
            let div = document.createElement('div')
            let img = document.createElement('img')
            let p = document.createElement('p')
            img.src = cocktail.strDrinkThumb
            img.style.width='520px'
            img.style.height='345px'
            img.style.marginTop='30px'
            img.style.borderRadius='10px'
            img.style.marginLeft='57px'
            p.style.fontSize='33px'
            p.style.marginLeft='55px'
            p.innerHTML = cocktail.strDrink 
            div.appendChild(img)
            div.appendChild(p)
            output.appendChild(div)
    
            div.addEventListener('click',()=>{
                getDetailById(cocktail.idDrink)
            })
    
        })
    }

    
    const searchByName = (event) =>{
        let cocktailName = event.target.value 
        if(cocktailName.length <= 1){
            fetchCocktails()
        }else{
            getAllCocktailByName(cocktailName)
        }
    }


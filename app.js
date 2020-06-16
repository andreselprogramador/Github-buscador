const input = document.querySelector("#input");
const result = document.querySelector("#result");
const eliminar = document.querySelector("#eliminar");

async function getUser(name){
    const response = await fetch(`https://api.github.com/users/${name}`);
    const data = await response.json();
    console.log(data);
    try{
        if(data.message === "Not Found"){
            result.innerHTML = `
             <div class="result-card">
                <div class="result-text">
                    <p>ERROR: USUARIO NO ENCONTRADO</p>
                </div>
            </div>`;
        }else{
            result.innerHTML = `
             <div class="result-card">
                <div class="result-img">
                    <img src=${data.avatar_url}">
                </div>
                <div class="result-text">
                    <p>Seguidores: ${data.followers}</p>
                    <p>Nombre: ${data.name}</p>
                    <p>Repositorios Públicos: ${data.public_repos}</p>
                    <p>Email: ${data.email}</p>
                    <p><a href="${data.html_url}" target="_blank">Ir a perfil en GitHub  <i class="fas fa-external-link-alt"></i></a></p>
                </div>
            </div>`;
        }
    }catch(error){
        console.log(error);
    }
}

function limpiarInput(){
    input.value = "";
    result.innerHTML = "";
}

eliminar.addEventListener("click", function(e){
    if(eliminar.classList.contains("mostrar")){
        eliminar.classList.remove("mostrar");
        limpiarInput();
    }
    
    e.preventDefault();
})

input.addEventListener("keyup", function(e){
    if(input.value.length > 0){
        eliminar.classList.add("mostrar");
    }else{
        eliminar.classList.remove("mostrar");
    }

    e.preventDefault();
})

document.getElementById("btn").addEventListener("click", function(e){
    getUser(input.value);
    e.preventDefault();
})
// Search.jsx
import React, { useState } from 'react';
import style from './style.module.css';

const ModalError = ({ message }) => {

    // clique em qualquer lugar para fechar o modal
    window.onclick = function (event) {
        if (event.target.className === style.modalError) {
            event.target.style.display = "none";
        }
    }
    

    return (
        <div className={style.modalError}>
            <p>{message}</p>
        </div>
    );

};

function Search({ onWeatherUpdate }) {
    const [cidade, setCidade] = useState("");


    function searchInput(e) {
        e.preventDefault();
        const currentValue = e.target.searchInput.value;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === '404') {
                    setCidade(<ModalError message="Cidade não encontrada pesquise novamente!" />);


                
                } else {
                    onWeatherUpdate(data);
                }
            })
            .catch(error => {
                console.log("Erro na solicitação:", error);
                setCidade("Erro ao obter dados");
            });
    }

    return (
        <div className="searchWraper">
            <div className={style.Search}>
                <h2>Digite a cidade que você quer saber a previsão...</h2>
                <form onSubmit={(e) => searchInput(e)}>
                    <input placeholder="Digite a cidade" type="text" name="searchInput" />
                    <button type="submit" >
                        Pesquisar
                    </button>
                </form>
            </div>

            {cidade !== "" ? (
                <div>{cidade} </div>
            ) : null}
        </div>
    );
}

export default Search;

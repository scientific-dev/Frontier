import PlanetCanvas from "./PlanetCanvas";

document.addEventListener("DOMContentLoaded", () =>
    setTimeout(() => {
        const canvas = new PlanetCanvas();
        canvas.fetchData();

        document.getElementById('panel').addEventListener("click", () => {
            document.getElementById('content').classList.remove("is-not-visible");
            document.getElementById('panel').style.display = "none";
        });
            
        document.querySelector(".close-svg").addEventListener("click", () => {
            document.getElementById('content').classList.add("is-not-visible");
            document.getElementById('panel').style.display = "block";
        });

        document.body.addEventListener("click", e => {
            if (!e.target.classList.contains("search-bar")) {
                document.querySelector(".search-bar input").value = "";
                document.querySelector(".search-bar .search-holder ul").innerHTML = "";
            }
        });
    }, 2000)
);
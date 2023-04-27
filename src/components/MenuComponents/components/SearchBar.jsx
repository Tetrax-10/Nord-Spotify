import React from "react"

import { Icon } from "./MenuHelpers"

export default function SearchBar({ placeholder = "" } = {}) {
    function searchItem(e) {
        let query = e.target.value.trim().toLowerCase()
        let rows = document.querySelectorAll(".popup-row")
        rows.forEach((row) => {
            if (row.id == "search-ignore-element") return
            if (query == "") {
                row.style.display = "unset"
                return
            }
            if (row.id == "search-element") {
                if (row.textContent.trim().toLowerCase().includes(query)) {
                    row.style.display = "unset"
                } else {
                    row.style.display = "none"
                }
            } else {
                row.style.display = "none"
            }
        })
    }

    return (
        <div className="popup-row search-div" id="search-ignore-element">
            <div className="col">
                <div className="nord-search-container">
                    <Icon className="nord-search-icon">search</Icon>
                    <input className="nord-search" placeholder={placeholder} onChange={searchItem}></input>
                </div>
            </div>
        </div>
    )
}

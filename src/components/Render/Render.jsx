import React from "react"

import MenuComponents from "../MenuComponents/MenuComponents"

export default function Render({ children: structure = [["", {}]] } = {}) {
    return (
        <>
            {structure.map(([component = "", props = {}]) => {
                switch (component) {
                    case "ActionInput":
                        return <MenuComponents.ActionInput {...props} />
                    case "ActionButton":
                        return <MenuComponents.ActionButton {...props} />
                    case "Button":
                        return <MenuComponents.Button {...props} />
                    case "ColorInput":
                        return <MenuComponents.ColorInput {...props} />
                    case "Details":
                        return <MenuComponents.Details {...props} />
                    case "Dropdown":
                        return <MenuComponents.Dropdown {...props} />
                    case "Heading":
                        return <MenuComponents.Heading {...props} />
                    case "Input":
                        return <MenuComponents.Input {...props} />
                    case "LinkActionButton":
                        return <MenuComponents.LinkActionButton {...props} />
                    case "MultipleActionButton":
                        return <MenuComponents.MultipleActionButton {...props} />
                    case "SearchBar":
                        return <MenuComponents.SearchBar {...props} />
                    case "LittleSpace":
                        return <MenuComponents.LittleSpace />
                    case "Space":
                        return <MenuComponents.Space />
                    case "Divider":
                        return <MenuComponents.Divider />
                    case "Text":
                        return <MenuComponents.Text>{props}</MenuComponents.Text>
                    case "Para":
                        return <MenuComponents.Para>{props}</MenuComponents.Para>
                    case "Inline":
                        return <MenuComponents.Inline>{props}</MenuComponents.Inline>
                    case "Highlight":
                        if (typeof props === "string") {
                            return <MenuComponents.Highlight>{props}</MenuComponents.Highlight>
                        } else {
                            return <MenuComponents.Highlight {...props} />
                        }
                    case "Link":
                        return <MenuComponents.Link {...props} />
                    default:
                        console.error(`Nord:unexpected: ${component} components not found > from: \`Render()\``)
                }
            })}
        </>
    )
}

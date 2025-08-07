/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 * 
 * 
 * Citation for use of AI Tools:
 * Date: 8/6/2025
 * Researched time delay function on Google and implemented mouseEnterHandler()
 * and mouseLeaveHandler() with help from Google AI overview.
 * Prompts used: "how to put a time delay on a tooltip component react" and
 * "how to make something appear on a delay only while the cursor is hovering
 * over it, not when the cursor leaves react"
 * Source URL: https://www.google.com/
 */


import { useState, useRef } from 'react';

/**
 * Creates a reusable tooltip component (which still must be styled). Causes
 * text to appear when a user's mouse hovers over the child element.
 * @param {string} text The text to be displayed in the tooltip.
 * @param {element} childElement The HTML element that will be used to display the
 * tooltip.
 * @param {number} delay The time in milliseconds to delay the tooltip from appearing.
 * @returns A React element rendering specified text when hovering over the
 * specified childElement.
 */
function Tooltip ({text, childElement, delay}) {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef(null);

    // When the mouse first hovers over the icon, delay starts.
    const mouseEnterHandler = () => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
        }, delay)
    };

    // Delay timeout is cleared when mouse leaves the icon.
    const mouseLeaveHandler = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    }

    return (
        <div className='tooltip-div'
            onMouseEnter = {mouseEnterHandler}
            onMouseLeave = {mouseLeaveHandler}>
            {childElement}
            {isVisible && <div className='tooltip-text'>{text}</div>}
        </div>
    );
}

export default Tooltip;
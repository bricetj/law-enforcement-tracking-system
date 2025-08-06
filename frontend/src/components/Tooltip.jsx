import { useState, useRef } from 'react';

/**
 * Creates a reusable tooltip component (which still must be styled). Causes
 * text to appear when a user's mouse hovers over the child element.
 * @param {*} text The text to be displayed in the tooltip.
 * @param {*} childElement The HTML element that will be used to display the
 * tooltip. 
 * @returns A React element rendering specified text when hovering over the
 * specified childElement.
 * 
 * Code citation: Researched time delay function on Google and implemented
 * mouseEnterHandler() and mouseLeaveHandler() with help from AI overview.
 * Prompts: "how to put a time delay on a tooltip component react" and
 * "how to make something appear on a delay only while the cursor is hovering
 * over it, not when the cursor leaves react".
 */
function Tooltip ({text, childElement, delay}) {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef(null);

    const mouseEnterHandler = () => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
        }, delay)
    };

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
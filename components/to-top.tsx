import React, { useState } from 'react'
import styled from 'styled-components'
import theme from 'theme'
import { useScrollPosition } from 'hooks/scroll'

interface Props {
    
}

const ToTop = (props: Props) => {
    
    const [hideOnScroll, setHideOnScroll] = useState(true)

    useScrollPosition(({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    }, [hideOnScroll])
    return (
        <Button hide={hideOnScroll} onClick={() => {
            window.scrollTo({
               top: 0, behavior: 'smooth' 
            })
        }}>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
	 viewBox="0 0 330 330" xmlSpace="preserve">
<path  d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
	l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
	C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"/>

</svg>


        </Button>

        )
}

const Button = styled.button<{hide: boolean}>`
    display: ${props => props.hide ? 'none' : 'block'};
    border-radius:50%;
    padding: 7px 10px;
    border: 0;
    cursor: pointer;
    position: fixed;
    bottom: 94px;
right: 30px;
    background: white;
    box-shadow: 0 1.5px 4px rgba(0,0,0,.24),0 1.5px 6px rgba(0,0,0,.12);
    z-index: 100;
    svg {
        fill: #62bead;
        width: 25px;
        height: 25px
    }
`

export default ToTop

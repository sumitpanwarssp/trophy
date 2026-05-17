import styled from "styled-components";

const Bars = styled.div`
    width:26px;
    background:#666;
    height:3px;
     transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
`;

export const Hamburger = ({showNav , setShowNav}) => {
    
    const toggleNav = () => { setShowNav(!showNav)};
    return (
        <div onClick={toggleNav}  className={`flex flex-col gap-1 cursor-pointer items-center ${ showNav ?  'navvisible' : 'navhidden' }`}>
            <Bars></Bars>
            <Bars></Bars>
            <Bars></Bars>
        </div>
    )
}
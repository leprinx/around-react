function Header(props) {
    return (
        <header className={props.containerClass}>
          <img src={props.vector} alt="Around the US" className={props.logoClass} />
        </header>
    )

}

export default Header;
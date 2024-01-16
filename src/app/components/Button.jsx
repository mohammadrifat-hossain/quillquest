function Button(props) {
    const className = [
        props.animation,
        'w-48 border-2 hover:border-white text-sm border-orange text-white rounded p-4'
    ].join(' ');
    
    return (
        <button className={className}>
            <div className='button-children'>
                {props.children}
            </div>
        </button>
    );
}
export default Button
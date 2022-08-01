import './Button.scss';

function Button({ children, className, onClick }) {
    return (
        <button className={`btn ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}

function OutLineButton({ children, className, onClick }) {
    return (
        <button className={`btn btn-outline ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}

export { Button, OutLineButton };

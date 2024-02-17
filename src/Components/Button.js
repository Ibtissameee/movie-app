import "./button.css";

export default function({name, icon,onClick, color, bgColor, border,backdropfilter, boxshadow}){
    return(
        <div className="button" onClick={onClick} style={{color: color, background: bgColor, border: border, backdropFilter: backdropfilter}}>
            {icon}{name}
        </div>
    );
}
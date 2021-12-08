export default function Card({text, id, onDelete, onEdit}) {
  return (
    <div className="row todos-item">
      <div className="col s12">
        <div className="card">
          <div className="card-content darken-text todos-content">
            <pre className="card-text todos-item-text">{ text }</pre>
          </div>
          <div className="card-action todos-item-btns">
            <button className="btn wawes-effect wawes-light" onClick={() => onEdit(text, id)}>
              <i className="material-icons">edit</i>
            </button>
            <button className="btn wawes-effect wawes-light red" onClick={() => onDelete(id)}>
              <i className="material-icons">delete</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

}
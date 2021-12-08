import Card from './Card'

export default function Cards({notes, onDelete, onEdit}) {
  const cards = notes.map(({text, _id}, index) => (
    <Card key={ index } text={ text } id={ _id } onDelete={ onDelete } onEdit={ onEdit }/>
  ))

  return (
    <div className="todos">
      { cards }
    </div>
  )
}
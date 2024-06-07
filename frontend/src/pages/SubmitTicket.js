import { useRef, useState  } from "react"


const SubmitTicket = () => {
  const subjectRef = useRef()
  const [subject, setSubject] = useState('')

  const bodyRef = useRef()
  const [body, setBody] = useState('')
  
  return (
    <section>
      <h1></h1>
      <form>
        <label htmlFor="subject">
          Subject:
        </label>
        <input 
          type="text" 
          id = "subject"
          ref={subjectRef}
          autoComplete="off"
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <label>
          Ticket:
        </label>
        <input
          type = "text"
          id = "body"
          ref={bodyRef}
          autoComplete = "off"
          onChange = {(e) => setBody(e.target.value)}
          required
        />
      </form>
    </section>
  )
}

export default SubmitTicket
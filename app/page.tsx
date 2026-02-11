import ExploreBtn from "@/components/ExploreBtn"
import EventCard from "@/components/EventCard"
import { events } from "@/lib/constants"


const app = () => {
  return (
    <section>
      <h1 className="text-center">The Place for every Developer</h1>
      <p className="text-center mt-5">Connect with developers, share knowledge, and grow together.</p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events.map((event) => (
            <li key={event.title}> <EventCard {...event} /> </li>
        ))}
        </ul>
      </div>
    </section>
  )
}

export default app


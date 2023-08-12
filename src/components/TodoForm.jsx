import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  DatePicker,
  TimePicker,
  DateCalendar,
  renderTimeViewClock,
} from "@mui/x-date-pickers";
import { Bell, CalendarDay, Clock, Palette, X } from "react-bootstrap-icons";

import Spinner from "./Spinner";

const TodoForm = ({
  hanleSubmit,
  heading = false,
  text,
  setText,
  day,
  todoProject,
  setTodoProject,
  setDay,
  time,
  setTime,
  projects,
  showButtons = false,
  setShowModal = false,
  loading,
}) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <form
          action=""
          onSubmit={hanleSubmit}
          className="bg-slate-100 p-4 w-[500px] rounded todoForm overflow-y-auto pb-10 overflow-hidden duration-700 ease-in"
        >
          <div className="text">
            {heading && (
              <h3 className="my-4 mx-0.5 font-bold text-[1.2rem]">{heading}</h3>
            )}
            <input
              type="text"
              value={text}
              className="w-full p-4 border outline-none focus:border-sky-500 font-[1.2rem] mb-2 transition-all"
              onChange={(e) => setText(e.target.value)}
              placeholder="To do ..."
              autoFocus
            />
          </div>
          <div className="flex items-center p-2 gap-x-2">
            <Bell />
            <p>remind me</p>
          </div>
          <div className="p-4">
            <div className="flex items-center p-2 gap-x-2">
              <CalendarDay></CalendarDay>
              <p>Choose day</p>
            </div>
            <DatePicker
              label="Controlled picker"
              value={day}
              onChange={(newDay) => setDay(newDay)}
            />
          </div>
          <div className="p-4 pt-0">
            <div className="flex items-center p-2 gap-x-2">
              <Clock />
              <p>Choose day</p>
            </div>
            <TimePicker
              label="With Time Clock"
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              value={time}
              onChange={(time) => setTime(time)}
            />
          </div>
          <div className="flex items-center p-2 gap-x-2">
            <Palette />
            <p>Choose a project</p>
          </div>
          <div className="flex flex-wrap p-4 pb-0 projects">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`project p-1.5 rounded border border-slate-500 m-1.5 hover:bg-blue-400 transition-all ${
                  todoProject === project.name ? "bg-blue-400 text-white" : ""
                }`}
                onClick={() => setTodoProject(project.name)}
              >
                {project.name}
              </div>
            ))}
          </div>
          {showButtons && (
            <>
              <div
                className="absolute top-0 right-[5px] cursor-pointer "
                onClick={() => setShowModal(false)}
              >
                <X size={40} />
              </div>
              <div className="confirm">
                {loading ? (
                  <div className="absolute bottom-0 left-0 w-full">
                    <Spinner></Spinner>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="absolute bottom-0 left-0 w-full h-10 text-base font-semibold leading-3 text-white transition-all ease-linear bg-blue-500 hover:bg-blue-600"
                  >
                    + add todo
                  </button>
                )}
              </div>
            </>
          )}
        </form>
      </LocalizationProvider>
    </>
  );
};

export default TodoForm;

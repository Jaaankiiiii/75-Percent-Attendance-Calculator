import { useEffect, useState } from 'react'
import { eachDayOfInterval,format, isBefore, isSunday,isToday } from 'date-fns';
import './App.css'
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";


function App() {

  const[semesterStart, setSemesterStart] = useState(()=>{
    const saved = localStorage.getItem('start');
    return saved? JSON.parse(saved) : format(new Date().toLocaleDateString(),'yyyy-MM-dd');
  });

  const[semesterEnd, setSemesterEnd] = useState(()=>{
    const saved = localStorage.getItem('end');
    return saved ? JSON.parse(saved) : format(new Date().toLocaleDateString(),'yyyy-MM-dd');
  });
  
  const[attendance, setAttendance] = useState(()=>{
    const saved = localStorage.getItem('attendanceData');
    return saved? JSON.parse(saved) : {};
  });
  
  const [stats, setStats] = useState(null);
  const[holidays, setHolidays] = useState(()=>{
    const saved = localStorage.getItem('holiday');
    return saved? JSON.parse(saved) : [];
  });
  const[selectedDate, setSelectedDate] = useState(""); 
  
  useEffect(function(){
    localStorage.setItem('attendanceData',JSON.stringify(attendance));
  },[attendance]);

  useEffect(()=>{
    localStorage.setItem('holidays',JSON.stringify);
  },[holidays]);

  
  const calculateStats=()=>{
    const alldates = eachDayOfInterval({
      start : new Date(semesterStart),
      end : new Date(semesterEnd)
    })
    let totalWorkingDay =0;
    let attendedDay = 0;
    let totalWorkingDayTillCurr = 0;
    let attendedDayTillCurr =0;
    alldates.forEach((day)=>{
      const date = format(day, 'yyyy-MM-dd')
      const holiday = isSunday(new Date(date)) || holidays.includes(date);
      const today = isToday(new Date(date));
      if(!holiday){
        totalWorkingDay=totalWorkingDay+1;
        if(!today && isBefore(new Date(date), new Date())){
          totalWorkingDayTillCurr=totalWorkingDayTillCurr+1;
          if(attendance[date]===true) attendedDayTillCurr=attendedDayTillCurr+1;
        }
        if(attendance[date]===true){
          attendedDay=attendedDay+1;
        }
      }
    });
    const percentageTillCurr = totalWorkingDayTillCurr > 0 ? (attendedDayTillCurr/totalWorkingDayTillCurr)*100 : 0;
    const percentage = totalWorkingDay>0 ? (attendedDay/totalWorkingDay)*100 : 0;
    const f = Number((0.75 * totalWorkingDay) - attendedDay);
    const dayMoreToAttend = f<0 ? 0 : f ;
    const classesYouCanLeave = dayMoreToAttend===0 ? Math.abs(f) : 0;
    // console.log(`total working day : ${totalWorkingDay}\ntotal attended class : ${attendedDay}
    //   \ntotal percentage : ${percentage}\n
    //   total ercentage till today : ${percentageTillCurr}\nMore days to attend class for 75 percent : ${dayMoreToAttend}
    //   \nClasses you can leave ans still be safe : ${classesYouCanLeave}`
    // );

    setStats({
      totalWorkingDay,
      totalWorkingDayTillCurr,
      attendedDay,
      attendedDayTillCurr,
      percentageTillCurr : percentageTillCurr.toFixed(2), 
      percentage : percentage.toFixed(2), 
      dayMoreToAttend,
      classesYouCanLeave
    });
    console.log(`start date : ${semesterStart}, end date: ${semesterEnd}`);
    return {totalWorkingDay,attendedDay};
  }

  const modifyHoliday=(action)=>{
    if(!selectedDate) return;
    if(action==='ADD'){
      if(!holidays.includes(selectedDate)){
        setHolidays([...holidays,selectedDate]);
      }
    }
    else if(action==='REMOVE'){
      setHolidays(holidays.filter((holiday)=>holiday!=selectedDate));
    }
  };
  console.log(holidays);
  function toggleDay(date){
    const key = date.toISOString().split("T")[0];
    setAttendance(prev=>{
      const current = prev[key];
      let nextValue;
      if(current===undefined) nextValue=true;
      else if(current===true) nextValue=false;
      else if(current===false) nextValue=undefined;
      else nextValue=true;
    
      return{
        ...prev, [key] : nextValue
      }
    });
  }
  return(
    <div className='app-div'>
      {/* Sidebar Section */}
      <div className='input-section'>
        <h2>📅 Configuration</h2>
        
        <label htmlFor="start">Semester Start</label>
        <input type="date" id="start" value={semesterStart}
          onChange={(e) => {
            setSemesterStart(e.target.value);
            localStorage.setItem('start', JSON.stringify(e.target.value));
          }}
        />

        <label htmlFor="end">Semester End</label>
        <input type="date" id="end" value={semesterEnd}
          onChange={(e) => {
            setSemesterEnd(e.target.value);
            localStorage.setItem('end', JSON.stringify(e.target.value));
          }}
        />

        <hr />

        <label htmlFor='holiday'>Add Holiday</label>
        <input type="date" id="holiday" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        <div className="button-group">
          <button className="add-btn" onClick={() => modifyHoliday('ADD')}>Add</button>
          <button className="remove-btn" onClick={() => modifyHoliday('REMOVE')}>Remove</button>
        </div>

        <button className="calc-btn" onClick={calculateStats}>Calculate Progress</button>
      </div>

      {/* Main Content Section */}
      <div className="calendar-section">
        <AttendanceCalendar attendance={attendance} toggleDay={toggleDay} holidays={holidays} />
        
        <div className="legend">
          <div className="legend-item"><span className="dot present"></span> Present</div>
          <div className="legend-item"><span className="dot absent"></span> Absent</div>
          <div className="legend-item"><span className="dot holiday"></span> Holiday</div>
        </div>

        {stats && (
          <div className='stats-container'>
            <div className="stat-card">
              <h4>Attendance Overview</h4>
              <p>Total Working Days: <strong>{stats.totalWorkingDay}</strong></p>
              <p>Total Attended: <strong>{stats.attendedDay}</strong></p>
              <p className="percentage-main">Overall: {stats.percentage}%</p>
            </div>
            <div className="stat-card">
              <h4>Status Till Today</h4>
              <p>Working Days: {stats.totalWorkingDayTillCurr}</p>
              <p>Current Percentage: <strong>{stats.percentageTillCurr}%</strong></p>
              <p className="status-msg">
                {stats.dayMoreToAttend > 0 
                  ? `Need to attend ${stats.dayMoreToAttend} more classes.` 
                  : `Safe! You can skip ${stats.classesYouCanLeave} more classes.`}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );


}
function AttendanceCalendar({ attendance, toggleDay,holidays }) {
  return (
    <Calendar
      onClickDay={(date) => toggleDay(date)}
      tileClassName={({ date }) => {
        const key = date.toISOString().split("T")[0];

        let classes = "";

        if (attendance[key] === true){
          classes += "present";
        }
        if (attendance[key] === false) classes += "absent";
        if (date.getDay() === 0) classes += " weekend";
        if(holidays.includes(key)) classes += "holiday";
        return classes;
      }}
    />
  );
}


export default App
 
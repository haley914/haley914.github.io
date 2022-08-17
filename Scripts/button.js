
function App() {
    const [namePool, setNamePool] = React.useState([]);
    const [blueTeam, setBlueTeam] = React.useState([]);
    const [redTeam, setRedTeam] = React.useState([]);
    const [inputName, setInputName] = React.useState("");
    const [totalUser, setTotalUser] = React.useState(0);
    const { DragDropContext, Draggable, Droppable } = window.ReactBeautifulDnd;

    function addPeopleToPool() {
        let pool = [...namePool]
        pool.push({ Name: inputName, id: totalUser });
        let newTotaluser = totalUser + 1;
        setTotalUser(newTotaluser);
        setInputName("");
        setNamePool(pool);
    }

    const handleChange = event => {
        setInputName(event.target.value);
    };

    function teamming(){
        let pool = [...namePool , ...blueTeam , ...redTeam]
        let newBlueTeam =[]
        let newRedTeam =[];
        for(let i =0; i< Math.min( 5, Math.floor(pool.length /2)) ; i++){
            let randomNum = Math.floor(Math.random()*pool.length);
            let personToBlue = pool[randomNum];
            newBlueTeam.push(personToBlue);
            pool.splice(randomNum, 1);
            randomNum = Math.floor(Math.random()*pool.length);
            let personToRed = pool[randomNum];
            newRedTeam .push(personToRed);
            pool.splice(randomNum, 1);
        }
        setBlueTeam(newBlueTeam);
        setRedTeam(newRedTeam);
        setNamePool(pool);
    }

    function drawOneToBlue(){
        let pool = [...namePool];
        if(pool.length > 0){
            let newBlueTeam =[];
            let randomNum = Math.floor(Math.random()*pool.length);
            let personToBlue = pool[randomNum];
            newBlueTeam.push(personToBlue);
            pool.splice(randomNum, 1);
            setBlueTeam(newBlueTeam);
            setNamePool(pool);
        }
    }

    function drawOneToRed(){
        let pool = [...namePool];
        if(pool.length > 0){
            let newRedTeam =[];
            let randomNum = Math.floor(Math.random()*pool.length);
            let personToRed = pool[randomNum];
            newRedTeam.push(personToRed);
            pool.splice(randomNum, 1);
            setRedTeam(newRedTeam);
            setNamePool(pool);
        }
    }

    const grid = 8;

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle
    });


    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "blcak" : "lightgrey",
        padding: grid,
        width: 250
    });
    const getBlueTeamStyle = isDraggingOver => ({
        background: isDraggingOver ? "blue" : "lightblue",
        padding: grid,
        width: 250
    });
    const getRedTeamStyle = isDraggingOver => ({
        background: isDraggingOver ? "red" : "indianred",
        padding: grid,
        width: 250
    });

    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);
        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;
        return result;
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    function onDragEnd(result) {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        switch (sInd) {
            case 0:
                if (sInd === dInd) {
                    const items = reorder(namePool, source.index, destination.index);
                    let newState = [...namePool];
                    newState = items;
                    setNamePool(newState);
                }
                else {
                    switch (dInd) {
                        case 1:
                            let result = move(namePool, blueTeam, source, destination);
                            let blueTeam_newState = [...blueTeam];
                            let namePool_newState = [...namePool];
                            namePool_newState = result[sInd];
                            blueTeam_newState = result[dInd];
                            setNamePool(namePool_newState);
                            setBlueTeam(blueTeam_newState);
                            break;
                        case 2:
                            result = move(namePool, redTeam, source, destination);
                            let redTeam_newState = [...redTeam];
                            namePool_newState = [...namePool];
                            namePool_newState = result[sInd];
                            redTeam_newState = result[dInd];
                            setNamePool(namePool_newState);
                            setRedTeam(redTeam_newState);
                            break;
                    }
                }
                break;
            case 1:
                if (sInd === dInd) {
                    const items = reorder(blueTeam, source.index, destination.index);
                    let newState = [...blueTeam];
                    newState = items;
                    setBlueTeam(newState);
                }
                else {
                    switch (dInd) {
                        case 0:
                            let result = move(blueTeam, namePool, source, destination);
                            let blueTeam_newState = [...blueTeam];
                            let namePool_newState = [...namePool];
                            blueTeam_newState = result[sInd];
                            namePool_newState = result[dInd];
                            setBlueTeam(blueTeam_newState);
                            setNamePool(namePool_newState);
                            break;
                        case 2:
                            result = move(blueTeam, redTeam, source, destination);
                            blueTeam_newState = [...blueTeam];
                            let redTeam_newState = [...redTeam];
                            blueTeam_newState = result[sInd];
                            redTeam_newState = result[dInd];
                            setBlueTeam(blueTeam_newState);
                            setRedTeam(redTeam_newState);
                            break;
                    }
                }
                break;
            case 2:
                if (sInd === dInd) {
                    const items = reorder(redTeam, source.index, destination.index);
                    let newState = [...redTeam];
                    newState = items;
                    setRedTeam(newState);
                }
                else {
                    switch (dInd) {
                        case 0:
                            let result = move(redTeam, namePool, source, destination);
                            let redTeam_newState = [...redTeam];
                            let namePool_newState = [...namePool];
                            redTeam_newState = result[sInd];
                            namePool_newState = result[dInd];
                            setRedTeam(redTeam_newState);
                            setNamePool(namePool_newState);
                            break;
                        case 1:
                            result = move(redTeam, blueTeam, source, destination);
                            redTeam_newState = [...redTeam];
                            let blueTeam_newState = [...blueTeam];
                            redTeam_newState = result[sInd];
                            blueTeam_newState = result[dInd];
                            setBlueTeam(blueTeam_newState);
                            setRedTeam(redTeam_newState);
                            break;
                    }
                }
                break;
        }
    }

    return (
        <React.Fragment>
            <div className="row g-2">
                <div className="col-auto">
                    <label htmlFor="name" className="visually-hidden">名字</label>
                    <input type="text" className="form-control" placeholder="名字" value={inputName} onChange={handleChange} />
                </div>
                <div className="col-auto">
                    <button type="button" className="btn btn-primary mb-3" onClick={addPeopleToPool}>新增</button>
                </div>
            </div>
            <div style={{ display: "flex" }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable key="0" droppableId="0">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {
                                    namePool.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={`${item.id}`}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-around"
                                                        }}
                                                    >
                                                        {item.Name}
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))
                                }
                            </div>
                        )
                        }
                    </Droppable>
                    <Droppable key="1" droppableId="1">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getBlueTeamStyle(snapshot.isDraggingOver)}
                            >
                                {
                                    blueTeam.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={`${item.id}`}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-around"
                                                        }}
                                                    >
                                                        {item.Name}
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))
                                }
                            </div>
                        )
                        }
                    </Droppable>
                    <Droppable key="2" droppableId="2">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getRedTeamStyle(snapshot.isDraggingOver)}
                            >
                                {
                                    redTeam.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={`${item.id}`}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-around"
                                                        }}
                                                    >
                                                        {item.Name}
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))
                                }
                            </div>
                        )
                        }
                    </Droppable>
                </DragDropContext>
            </div>
            <hr />
            <button type="button" className="btn btn-primary" onClick={teamming}>立即分隊</button>
            <button type="button" className="btn btn-info" onClick={drawOneToBlue}>加藍隊</button>
            <button type="button" className="btn btn-info" onClick={drawOneToRed}>加紅隊</button>
        </React.Fragment>
    );
}
const app_container = document.getElementById('app');
ReactDOM.createRoot(app_container).render(<App />);
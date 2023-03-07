import './App.css'
function App() {
  return (<><div className={'row mb-2'}>
                                  <div className={'col-md-12'}>
                                      <h5 className={"text-center"} style={{
                                          "animationName": "example",
                                          "animationDuration": "4s",
                                          "animationDelay": "1s"}}>Welcome to HyperReality Customer Survey</h5>
                                  </div>
                              </div>
                              <div className={'row'}>
                                  <div className={'col-md-12 text-center'}>
                                      <a type={"button"} href={"/survey"} style={{textDecoration:"none"}} className={'btn btn-sm bg-primary text-center text-white'}>Start</a>
                                  </div>
                              </div>
      </>
  );
}
export default App;

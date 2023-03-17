// import Link from 'next/link'

const Timesheet = () => {
  return (
    <>
      <section className='timesheet'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12 mrb-30'>
              <h2>Weekly Overview</h2>
            </div>
            <div className='timesheet-carousel'>
              <div className='row'>
                <div className='col-sm-1'>
                  <div className='left-arrow'>
                    <i className='fa fa-angle-left' aria-hidden='true'></i>
                  </div>
                </div>
                <div className='col-sm-10'>
                  <div className='center-arrow'>
                    <span className='active'>Nov 07 - Nov 13</span>
                    <span>|</span>
                    <span>Nov 14 - Nov 20</span>
                    <span>|</span>
                    <span>Nov 21 - Nov 27</span>
                    <span>|</span>
                    <span>Nov 28 - Dec 04</span>
                    <span>|</span>
                    <span>Dec 05 - Dec</span>
                  </div>
                </div>
                <div className='col-sm-1'>
                  <div className='right-arrow'>
                    <i className='fa fa-angle-right' aria-hidden='true'></i>
                  </div>
                </div>
              </div>
            </div>
            <div className='timesheet-buttons'>
              <div className='row'>
                <div className='col-sm-12'>
                  <button className='btn btn-one'>Pay as you goal</button>
                  <button className='btn btn-two'>Bundle</button>
                  <button className='btn btn-three'>Probono</button>
                </div>
              </div>
            </div>
            <div className='calendar-box'>
              <div className='row'>
                <div className='col-sm-12'>
                  <div className='table-responsive'>
                    <table className='table table-border'>
                      <tr>
                        <td>
                          <div className='first'>
                            <p>
                              2 <span>hour</span>
                            </p>
                            <p>
                              $ <span>000.00</span>
                            </p>
                          </div>
                          <div className='second'>
                            <p>
                              4 <span>hours</span>
                            </p>
                            <p>
                              $ <span>000.00</span>
                            </p>
                          </div>
                        </td>
                        <td>
                          <div className='third'>
                            <p>
                              1 <span>hour</span>
                            </p>
                            <p>
                              $ <span>000.00</span>
                            </p>
                          </div>
                          <div className='second'>
                            <p>
                              2 <span>hour</span>
                            </p>
                            <p>
                              $ <span>000.00</span>
                            </p>
                          </div>
                        </td>
                        <td>
                          <div className='third'>
                            <p>
                              1 <span>hour</span>
                            </p>
                            <p>
                              $ <span>000.00</span>
                            </p>
                          </div>
                          <div className='first'>
                            <p>
                              2 <span>hour</span>
                            </p>
                            <p>
                              $ <span>000.00</span>
                            </p>
                          </div>
                          <div className='second'>
                            <p>
                              2 <span>hour</span>
                            </p>
                            <p>
                              $ <span>000.00</span>
                            </p>
                          </div>
                        </td>
                        <td>
                        <div className="first">
                            <p>3  <span>hour</span></p>
                            <p>$ <span>000.00</span></p>
                          </div>
                        </td>
                        <td>
                        <div className='first'>
                            <p>
                              2 <span>hour</span>
                            </p>
                            <p>
                              $ <span>000.00</span>
                            </p>
                          </div>
                          <div className='second'>
                            <p>
                              4 <span>hours</span>
                            </p>
                            <p>
                              $ <span>000.00</span>
                            </p>
                          </div>
                        </td>
                        <td>
                        <div className='first'>
                            <p>
                              1 <span>hour</span>
                            </p>
                            <p>
                              $ <span>000.00</span>
                            </p>
                          </div>
                        </td>
                        <td></td>
                      </tr>
                      <tr className='week'>
                        <td>
                          <span>Mon 07</span>
                        </td>
                        <td>
                          <span>tue 08</span>
                        </td>
                        <td>
                          <span>wed 09</span>
                        </td>
                        <td>
                          <span>thu 10</span>
                        </td>
                        <td>
                          <span>fri 11</span>
                        </td>
                        <td>
                          <span>sat 12</span>
                        </td>
                        <td>
                          <span>sun 13</span>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>


            <div className="client-overview">
              <div className="row">
                <div className="col-sm-12">
                  <h2>client overview</h2>
                </div>
                <div className="col-sm-12">
                <div className="month-overview-table">
                  <div className="table-responsive">
                    <table className="table table-month">
                      <thead>
                        <tr>

                          <th></th>
                          <th colSpan={6}><i className="fa fa-angle-left"></i> November <i className="fa fa-angle-right"></i></th>
                        </tr>
                        <tr>
                          <th>name</th>
                          <th>07 - 13</th>
                          <th>14 - 20</th>
                          <th>21 - 27</th>
                          <th>28 - 04</th>
                          <th>05 - 11 </th>
                          <th>total</th>
                        </tr>
                      </thead>
                      <tbody>

                        <tr>
                          <td className='bundle'>J*** **e</td>
                          <td>2 hours</td>
                          <td>2 hours</td>
                          <td>2 hours</td>
                          <td>2 hours</td>
                          <td>1 hours</td>
                          <td>9 hours</td>
                        </tr>
                        <tr>
                          <td className='pay'>J*** **e</td>
                          <td>2 hours</td>
                          <td>2 hours</td>
                          <td>2 hours</td>
                          <td>2 hours</td>
                          <td>1 hours</td>
                          <td>9 hours</td>
                        </tr>
                        <tr>
                          <td className='pay'>J*** **e</td>
                          <td>2 hours</td>
                          <td>2 hours</td>
                          <td>2 hours</td>
                          <td>2 hours</td>
                          <td>1 hours</td>
                          <td>9 hours</td>
                        </tr>
                        <tr>
                          <td className='probono'>J*** **e</td>
                          <td>2 hours</td>
                          <td>2 hours</td>
                          <td>2 hours</td>
                          <td>2 hours</td>
                          <td>1 hours</td>
                          <td>9 hours</td>
                        </tr>
                        <tr>

                          <td colSpan={5}></td>
                          <td> <strong>Total</strong></td>
                          <td>36 hours</td>

                          <td colSpan={2}></td>
                          <td> <strong>Total</strong> <span>$000.00</span></td>

                        </tr>
                      </tbody>
                    </table>
                  </div>
                 </div>

                </div>
              </div>
            </div>

            <div className="month-overview">
              <div className="row">
                <div className="col-sm-12">
                  <h2>Month overview</h2>
                </div>
                <div className="col-sm-8">
                <div className="month-overview-table">
                  <div className="table-responsive">
                    <table className="table table-month">
                      <thead>
                        <tr>
                          <th>package</th>
                          <th>hours</th>
                          <th>earnings</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='bundle'>bundle</td>
                          <td>9 hours</td>
                          <td>$000.00</td>
                        </tr>
                        <tr>
                          <td className='pay'>pay as you go</td>
                          <td>18 hours</td>
                          <td>$000.00</td>
                        </tr>
                        <tr>
                          <td className='probono'>Probono</td>
                          <td>9 hours</td>
                          <td>$000.00</td>
                        </tr>
                        <tr>
                          <td colSpan={2}></td>
                          <td> <strong>Total</strong> <span>$000.00</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* <div className="row">
                    <div className="col-sm-4">
                      <h5>package</h5>
                    </div>
                    <div className="col-sm-4"><h5>hours</h5></div>
                    <div className="col-sm-4"><h5>earnings</h5></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4"><p><span className='bundle'></span> bundle</p></div>
                    <div className="col-sm-4"><p>9 hours</p></div>
                    <div className="col-sm-4"><p>$000.00</p></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4"><p><span className='pay'></span> pay as you go</p></div>
                    <div className="col-sm-4"><p>18 hours</p></div>
                    <div className="col-sm-4"><p>$000.00</p></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4"><p><span className='probono'></span> Probono</p></div>
                    <div className="col-sm-4"><p>9 hours</p></div>
                    <div className="col-sm-4"><p>$000.00</p></div>
                  </div> */}
                 </div>

                </div>
              </div>
            </div>
            <div className='timesheet-buttons'>
              <div className='row'>
                <div className='col-sm-12'>
                  <button className='btn btn-two'>view past payslips</button>
                  <button className='btn btn-four'>query my timesheet</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Timesheet

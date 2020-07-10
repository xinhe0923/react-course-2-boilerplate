import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";


export const LogInPage = ({startLogin}) => (//destrructure
    <div className="box-layout" >
      <div className='box-layout__box'>
        <h1 className="box-layout_title">Boiler plate</h1>
      <p>tagline for app</p>
      <button className="button" onClick={startLogin} >Log in with Google</button>

      </div>

    </div>
  );

const mapDispatchToProps=(dispatch)=>({
startLogin:()=>dispatch(startLogin())
}  )
export default connect(undefined,mapDispatchToProps)(LogInPage)
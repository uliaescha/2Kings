import "./Registration.scss";

function Registration () {
    return (
      <>
        <div className="reg-page">
          <div className="form-container">
            <h2 className="title">REGISTRATION</h2>
            <form>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />

              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />

              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />

              <button type="submit" className="submit-btn">
                SING UP
              </button>
            </form>
          </div>
        </div>
      </>
    );
}

export default Registration;
import Link from "next/link"
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const { pathname } = useRouter();
  console.log(pathname);

  return(
  <header className="header">
  <div className="menu-head">
    <div className="container">

	  <nav className="navbar navbar-expand-lg">
	    <div className="container-fluid">
		  <Link href="/"><a className="navbar-brand"><img src="../images/logo.png" alt="Long Island Tub Refinishing Logo"/></a></Link>
		  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>

		  <div className="collapse navbar-collapse" id="navbarSupportedContent">
		    <ul className="navbar-nav">
			  <li className={router.pathname == "/" ? "active" : ""}><Link href="/"><a>home</a></Link></li>
			  <li className={router.pathname == "/about" ? "about-active" : ""}><Link href="/about"><a>about us</a></Link></li>
			  <li className={router.pathname == "/coaching-journey" ? "coaching-active" : ""}><Link href="/coaching-journey"><a>about coaching</a></Link></li>
			  <li className={router.pathname == "/pricing" ? "pricing-active" : ""}><Link href="/pricing"><a>pricing</a></Link></li>
			  <li className={router.pathname == "/faq" ? "pricing-active" : ""}><Link href="/faq"><a>FAQ</a></Link></li>
			  <li className={router.pathname == "/contact" ? "contact-active" : ""}><Link className="scroll" href="/contact">contact</Link></li>
		    </ul>
		  </div>

		  <div className="login-info">
          <Link href="/pages/login"><a className="btn">Log In</a></Link>
          <Link href="/pages/register"><a className="btn">Sign Up</a></Link>
      </div>
	    </div>
	  </nav>

    </div> {/* <!--/ menu-head --> */}
  </div> {/* <!--/ container --> */}
</header>
  )
}
export default Header

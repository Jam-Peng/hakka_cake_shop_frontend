import Banner from "../components/home/Banner"
import mobileSlider from "../assets/slider/mobileSlider_1.png"

function Home() {
  document.title = '客家糕粿店 | 首頁'
  
  return (
    <section>
      <div className="overflow-hidden sm:pt-2 sm:pb-10">
        <div className="hidden sm:block">
          <Banner/>
        </div>
        <div className="sm:hidden">
          <img src={mobileSlider} alt="" />
        </div>
      </div>

    </section>
  )
}

export default Home
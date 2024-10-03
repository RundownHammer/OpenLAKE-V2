import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import '../css/blogdetail.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function BlogDetailSmall(props) {

  const [item, setItem] = React.useState(props.item);

  useEffect(() => {setItem(props.item)}, [props.item]);

  return(
    <div id="list-container">
      {item.map((blog, index) => (
        <div id="card" key={index}>
          <div className="user-info">
            {blog.profile_photo?
              <Avatar alt="Remy Sharp" src={blog.profile_photo} sx={{ width: 24, height: 24 }}/> :
              <Avatar alt="Remy Sharp" sx={{ width: 24, height: 24 }}/>}
            <p>{blog.username}</p>
            <p id="posted-on">posted on {blog.created_at.split('T')[0]}</p>
          </div>
          <Link  to={`:${blog.id}`}>
          <h2>{blog.title}</h2>
          <div className="blog-info">
            {blog.image_url?
              <Avatar alt="Remy Sharp" src={blog.image_url} sx={{ width: 75, height: 75 }} style={{float:'left', marginTop:'6px',marginRight:'14px'}} variant="square" /> :
              <Avatar alt="Remy Sharp" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKoAqgMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAAAwQFBgECBwj/xAA+EAACAQMCAwYCBwYGAgMAAAABAgMABBESIQUxQQYTIlFhcTKBBxQjkaGxwRUzQlLR8CRicoLh8UOyFjRE/8QAGAEBAAMBAAAAAAAAAAAAAAAAAAECAwT/xAAgEQEBAQEAAwACAwEAAAAAAAAAARECAyExIkESE1EE/9oADAMBAAIRAxEAPwDhtFFFAUUUUBRRRQFFFFAUUUUBRRRQFFFFAUVmsUBRRRQFFFFAUUUUBRRRQFFFFAUUVtpOM4286DWis71igKKKKAooooM1YOyXZK/7TzyJZhUiiGZJXOFB6D3qGsraW8u4baBSZJXCqPU16R4BwaDs32dtrGFfHpBkbG7N1JqnfWfGnHO/Xmu5he2uJbeUYkicow9QcGkqsHb4KvbLiwQAD6wTt7Cq/V2YooooCiiigKKKKAooooCiiigUgieeZIohqkdgqjzJ2Fdd4b2X4ZaWS2kttHPKNpJXXJY9flXNOyWD2m4Zkf8A6U/OuzAEzpjYZ3NY+W/pv4Z+1L7S9gE7pp+DgxuP/AxyH/0+Vc5ZSpKsCCOYPSvSDxwzQ93qLseeOdcs+kHs4yStxC1Qs2f8Qqjn/n/Q/fUePvLlT5PH+4oFZoPOs4J3AOPOt3OxQASQBzNPLDhl3fziG1gZ3PyH31YY+z6cJCz3UoluAMiNPhU+p61XrqRbni1P/RF2eM3GTxC6TP1YeEHoSP6V168UTS75HqN6rfYGBLXhSQgfaONbtnOonc/36VadJLDHnWE6266f456ecO3iSf8AyziTuDh52Kk53HKoEIxzgHA5k9KtX0hXEcnae803IuCsjADQAse/L1qqvIzHxHOOXlXRPjlv1qRjrvWKyBnkM+1YqUCiiigKKKKAooooCiiigf8AArtbDjFldv8ABFMrN/pzv+FdtlYwqHXJ9VP4iuCCu09mbn9odl7BtWblIhGQ38YG1Yeb1JXR/wA/u2LHYXLhRlgPI91vUf2nJW379NmXkcc/ceVMpLySy1d7P3SgeGNQMt/frSZvBxdu5ilk1tz1rjb9axzW+e1MuuD8MYi4jtsAnLxBtgee3pUrBbwrEohghSLRs5i2U9AfI561L3XBokl1SMve7/Zodj5A0jLbqkL20hCkRgGJhk55ZPyH95q22/WeYiozNJO8VuqqUXJUDSMjYj35ffWtwzrDHJcQahrKSg9N9iPKpvgVjiKyfAkOltQb4myBk+vtUtNwIRXP1oDvIZSG8R2caeRHXkPxq3pHtjsqVtbj4pWjJyM8sAVc4JO8USI5cyclPSqZYyi1t7W/yyWs48IOPs8qcA/OrXbywr3buQpIBRl5MP7FVWji/wBJ/AIuCcee4hRngvMyqDyU58Q+/wDOqSZnB8JC/wCkAV236VLBrzg4lK5KYwR75rhxro4uxzdzK2aV2GC7Ee9aUUVdQUUUUBRRRQFFFFAUUVnFALXX+wY+odnrc3B0syOYy+2MnP6fjVH7F9mJOO3qNKrC0U5ZlPP09K6p2gs44+HpbwqoA8KgDlXN5+pfxdXg5s/JCQW44lxGNu8+BsgjcCpt7O3tQRDAiT55qTgeuOlQnArP9nPNN38jtpzgYAFSMV08iZY5yc5xsayta7raZCWMjgnJwSxxvimq6p2fCqs+jCAnfGMYOemSceW/nTy7i72BI0K41ZJJ/H2qvycS4bwy9031+zMvhKImoD7qtzFKmuyyxcXga3nXurq1YaSp8UbA/EPu/Gr5PZxvAkUgGMYyowCf0qm8DHDri6biXDJ1fUPHp2yfUedXK1uBIhR9ziiEbfdnlfhklpFGojZNK4GN+lRvE4ouC8PsIr66WAxRKgUbtIRz0gbnFXzh6iSIod8edcC+kPiUl9224iblyq2sjQW4/kCbY+ZBPzq851XXRoprfjnBZI1djbygr4hpKn/uuD9pOFPwfi09nI2pkOdWMZHQ13DgV3A1zbcOKgxz2hldSfh5dfc/jXNfpZto7fjkBiYtqhIyfIMQPer+P1cV8mWaolFZrFbMBRRRQFFFFBmjFKQQSTzJFCjO7nCqo3NW7g3ZNInE3GCDtkW6n/2NV66nP1bni9fFVtbG6vJBHawSSuTgBVzXSexv0YSXLpc8ZJjQYPdgjepvs1YC5mjjtreOCFTnEa4/s10i2jESBcbDlWHXlt+N54pPprbcJtLC2S3tIlijjG2kfnUL2jsyYFZTyarNK9RPElE0LqR0zmsa2ilzhEiVCB4vi9aRMltbQLLJOqrz1FtOPTeluKyJDktjK+ECoCeKe+eNblcRLyXpmpiKmUv5bzhk0tqx7kHDTKhA0Z3K59KoHFEgt+MPGVKxLJh8DcL6fKrxZ8S/Z32E0eu3caGQbhh1GDSL8C4fxNw9ncwMhOFS7Q6l/wAuQd/nWnFxn1LUNwK7/ZQi4jAWEffBDn/yJ7eldYtJ1kjSaI+FwGHzqkN2OubhQZryNgg+zjijwo8qtfB7STh9jFbSNq0KcGnVTzMi2cGu1z4iADsaoXbPsbJf9p7m5tbS3bvGEpeZyFY4GTgc/wAOdWiylWN+eCTVlAS4hOoBvlU8256R1JK5jwrhi8OmljSb6xfTgLNcYwFX+VR0FUX6XVt4+N26DvDKIBrJ88nl/Wu9S8JsrS1muljK6FLMAefX768udqOLS8b45dXcqldTlUQb6VBwBV+Obu1n31P44iGxnbOPWsUs1u6DMg7v/Vsfu51o2kbLk+prZi0ooooCiiigvvA7deExnuYB3x5zMCW+4chT4y3DSazGrnPqM1IuoQlCPAM5yuCRSTdyuox+I42J5fdXHbt2uyTJkPuFdqLq0IUWqBMjOkYNXjg/aCG8iGsjURuc1y12OosrEYxtSlrdvA/eRuwYbjHn7VCXYXmVgCeVRt3LgEDkRUHwXtClyiwXTBJeWejVJTP4Tq3B5Gq1aIW+s4ZpQz4IB3251rNBDGQV/d+nKpB8ZwR4T1JpvJaA7blSdtOwqIVA3cEHed4kulunhz+FZ4fb97KVj1kZ8T40r/zUq9vFGxJUZzzpay0GQBhsPTFXUT9jAsFuiadO2+d6J1JOxrVHZlJXAUeZpOSfSPiBPkKkR0nFIluTCsgLKcMAeVWbs1xZrhjHjK8hVVueC2XFHaRPsLjn3g2y3mameyuq0acSsGZHwPlU8/W28f13/Vs4tCt1wy5tXLBZoWU6BlsEdBXmDiqSWE7IlrDAoYqqyrJGxHrnwGvQvaXj1vwvhs8jyMJtGECbsCeRx/WuC8Rvp4vtJpVurSc5F5EoAOekqDwk+p57kZ3rflwdK8TdkZit4QCecaKfxFNZIbh2LuhyeZwBUnc/U2Aa4s9EZ5XFo/hPyxge3P2pk9gJF12lwk+2SmMOB7f0rRQzYaTjIPtWtKNC6/wnHmNxWmKDFFFFB12GGKST7KW4BG2nnnfzxj9K3uVktwp7tWj2Dxg5b0P4elIQ3s+sLBbrMpkJ7yV9IHXYYpwZNcy62ZNYyVIBUcvma43abyWeCTCpO2rBpjJEUJO2rlkcudSXhnfV3q94z50uckD0pKY8hKPH8IKDY460QZxzFXKuM565q29n+JGX/C3bFgRiNm6elVOeEqwOr5jyp5ZvpdOgH8XUUs1Mq8y22n7M/CeRpJUkiOOa094JOnEbLuZTmVOvnSjxFSUYYI2zjnVMxOoqSISg6RsKQFjKH8K6h5dBUwLXfA2NSVpZ4I9t/erRS1CW1vdIgQxlyep6UobZ2Vu8BjC9cVa4IhgbD3xTDtZfLwngdzcAeILhSBnBrScq3pAWx8fd26HfYuwqO7WdobPs3wySK3lV+JTLlFU8vUmuXcS7Z8WMbRRXTDvAMsCc7Z/4quXF7JNM0skju5Ocsc/L23rTnhn12mB2kunvmubyWWdXcrIrHcofyI3rHEZZ+EX7zWrJJBP+8jZdUcwO4JH+YYPvnHKq9I+pyw2zvipaF2veENE/ie3GlfPG5X7jqH+4VpjPQ0AKG84O7CPlLAxy0Z8v8y+RpkJ4iQ8kOhxvrgOk++OX3YpK1uZbWYSxNhhtvuCPIjqKdXBhnTv4o9v4gG8SH18x6/fUoayulwuqVwWz+8Aw3+4fqKaTRPEcOPbyPtWTjJ0Nt6jG1CS4XQ41R/y55e3lQJUUq8YxqibUvljce9J4oOrx3EszD6pGgVRks2yrzwMDmafROkiEzOGCnLac4z1wB0/pSFzEyhxZoEjALsen9k8qILQd3pD52AGF2Y42zXE7ST/V5JUESsJCBgnr/ea0+0hkIQa+RIGfDy6/OphbK3t4Y9OHk0kEYwPfNNUhyuLdgD8J8sE8z+VTqDQlMfYAtgYIbqPatGRUUmMY3zud6d9xpnZmjw6g6XHL/ukbuNU1NGSSTq2GRQPuGcQlsW75SWZctpBzkVc+E8VtuPRHSdNwvxL19657A2tdnIbfp0o7OXzcN43DJJqCpIdRIOwI5bVOaiunCIo4D/fUnaDato40urdXXfIzWYIih9KmTFbdOwoUDFcu+lrtCyQNY2zurR83jIBVsHmPLkPnXUHfCFjyAzXnPt3xL9pcXvSrMGDEhCNxgg/d4R99a8xnfijTStLIzP8AETk+9aVtJjVqUYB3x5VpWrIU/wCGTdwJX6eEEemaYUsh028g/mIH60GbyMR3Eir8OrK+x3FJxSGNgykhh1pW4bvIY5Oo8DHzxypvQOGVZRqiGG6p/SkMHGaATtShcSfvOf8AMBQJqSpyNjW2sfyihkxyOR6VpQdktJczMoRm1fCvMt5Z/OtoplJuJcpqX4gq7/Ief/FQ63KpL3q8imvJO5IHL8Kc2zyyWSSbCVmZ3cDOx5D9K48dmpEXZEOmUbgnCnnudvw3+dJLNyMagiRQo23zt16+VMoHlfvZCuQwGs+S89qfWVxFDaoxJfUMqrdPQ0w1vdGCPIk197gaCM4z5H1pG1mnQI6oWJOSH6edOgxl8cqsG69GyOVay3gjuSzHA07EqR7USSu7SUqZrPCsOaaah5HbQe+jAlOxB5qRuPxq2mcvhowh1Aatt/8AumkkdlfEux7uXcaiMcqSmLZ2P7SRyWSRXDaZFTxFyMmrVb3lvOv2bo2fKuVPCtuqykIxjO+QQG9RV14JNHcW0c6oEfG5AxV50zsS/G7kW3CbyXkVhYj7q8wcWuyOPTvI5ILaTr32ru3brjBteEyQppZ5VxgnpXn3iEqXk8ksQYYOdJ5hf+DW3LHo0nj7qR03wDtSVLyN3kKn+JNj6jpSFXUFZycYztWKKBWDxEx89YwB69P79aTPOgVtIwdtQ5nn70GlFFFBnJ86xRRQdElaNpEtVj2IDEj8vwzW31lYJPsWLkqFCL8Kt5/lSLfvnPXQu9J8M56uvn865nSf/XyqFDpVyBlRtnb8udby3feuI8qgc7aea42FMpv/ALCe5/WngUfWE2H7lDyqLEwuJrhW+yLhgd8tkE05f/GGNZJVzq2YkbYrRWPcucnOF/KsOALaAgAHz+VQk7ggZMmKdmYHJUjmKdRF/EJ1YI4J5HpURCzCOMhiD5g+gqZBJs0yep/KmJbIZ3geOT7RAMjPMe1WHgN9bLZhFYBk+IE1VYncPHhmGR0NbTEi3kIOPiFTEVEfSlxXvVMQOMHwsr+IVzAyESB1586nu0zsyrqYncczVdPSujn45uvpRiNygwDzXypOisVZUUUUUBWaxRQFFFFAUUUUH//Z" 
                sx={{ width: 75, height: 75 }} style={{float:'left', marginTop:'6px',marginRight:'14px'}} variant="square" />
            }
            <p>{blog.subtitle}</p>
          </div></Link>
          <Link  to={`:${blog.id}`}><Button style={{
            marginTop:'-6px',
            marginLeft:'-7px',
          }} variant="text" endIcon={<ArrowForwardIcon />}>Read more</Button></Link>
          <hr id="blog-list-hr" />
        </div>
      ))}
    </div>
  )
}

import React from "react";

const Transcript = () => {
  const transcript = [
    {
      time: "00:00",
      text: "Lorem ipsum dolor sit amet consectetur. Quam tristique faucibus nulla magna vel molestie quam neque. Sed vulputate in ac purus ac sed nullam tristique. Fermentum sagittis et diam velit nec duis. Velit eu interdum viverra quam ut enim. In ultrices mauris sapien nec et leo est.",
    },

    {
      time: "00:25",
      text: "Ipsum malesuada facilisi hendrerit in pellentesque. Amet pharetra ornare quis facilisis. Habitasse non volutpat euismod dui nibh adipiscing viverra.Morbi quis viverra vitae lobortis et cum. Quis dui libero cras neque. Sed amet eu ut velit dignissim in et volutpat. Vitae lorem nam facilisis elit morbi tristique mi.",
    },
    {
      time: "00:55",
      text: "aliquam dignissim. Mus nibh condimentum lectus elementum purus sit. Volutpat nulla sed aliquet pellentesque neque vulputate venenatis odio. Quisque lacus gravida platea ultricies. Eget rhoncus varius ac volutpat dignissim vehicula ut integer. Eu vitae senectus habitant arcu nibh cursus. Viverra semper sit in ",
    },
    {
      time: "01:45",
      text: "dictum. Molestie interdum purus aliquet tristique tempus fringilla metus. Amet tristique nulla vitae volutpat arcu augue. Elit cras nibh nunc tortor. Aliquet feugiat vitae ultricies maecenas aliquam.Posuere in viverra dignissim sagittis interdum lectus adipiscing. Suscipit eu tellus amet arcu bibendum interdum.",
    },
    {
      time: "01:45",
      text: "Ornare egestas elit consequat sit orci. Elit luctus facilisis dui et. A morbi imperdiet enim consectetur consequat euismod. Donec nec nulla nunc vitae vel eget nunc mattis felis. Vulputate ullamcorper mi ultrices adipiscing mauris praesent aliquam suspendisse ut. Euismod malesuada ut eleifend ipsum suspendisse. ",
    },
    {
      time: "02:13",
      text: "Mauris amet ut nibh odio mus sit. Quis aliquam neque ut sit varius purus mauris bibendum. Id velit lectus eget eu aliquet pulvinar dolor. Felis varius cursus nunc at ultrices tempor consectetur commodo. Morbi cursus lobortis ornare facilisis. Odio ac tempor dolor ornare urna odio tellus sit.",
    },
    {
      time: "02:40",
      text: "Nec molestie urna nisl lectus elementum quam mi augue. Purus libero justo et lectus leo. Varius ultricies faucibus vestibulum tellus sed elit dictumst at. Imperdiet quis ultrices nisl consequat enim vulputate. Amet suspendisse sit quis ac pellentesque. Id adipiscing a vulputate sit aliquam egestas faucibus cursus.",
    },
    {
      time: "03:00",
      text: "Sagittis lorem vulputate morbi nibh dolor sit sed. Quam mus convallis scelerisque et dui ipsum ornare hac quam. Sed nisl suspendisse egestas ut rutrum eu neque. Massa et adipiscing cum sed etiam vitae sed. Morbi dolor lacus integer mattis in feugiat. Volutpat nec quis risus ornare suspendisse.",
    },
    {
      time: "03:40",
      text: "Sagittis lorem vulputate morbi nibh dolor sit sed. Quam mus convallis scelerisque et dui ipsum ornare hac quam. Sed nisl suspendisse egestas ut rutrum eu neque. Massa et adipiscing cum sed etiam vitae sed. Morbi dolor lacus integer mattis in feugiat. Volutpat nec quis risus ornare suspendisse.",
    },
  ];
  return (
    <div className="bg-gray-100 w-full py-10 h-auto">
      <div className="my-3 mx-7">
        {transcript.map((item, index) => (
          <div className="flex gap-10 items-center py-3" key={index}>
            <p className="text-gray-600">{item.time}</p>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transcript;

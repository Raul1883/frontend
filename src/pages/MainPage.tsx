import { Typography, Card } from "antd";
import Header from "../components/Header";
import SessionsList from "../components/SessionsList";

const { Paragraph } = Typography;

export default () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-extrabold  bg-clip-text   mb-6">
          Привет!
        </h1>

        <Card className="w-full max-w-3xl shadow-lg rounded-2xl border-0 transition-all hover:shadow-xl">
          <Typography className="text-base md:text-lg leading-relaxed text-gray-700">
            <Paragraph>
              Это небольшой сайт, который я разрабатываю самостоятельно для себя
              и своих друзей. В данный момент сайт находится в стадии
              разработки, поэтому не удивляйтесь, если что-то не работает или
              выглядит странно. Я буду рад, если вы оставите свои отзывы и
              предложения по улучшению сайта.
            </Paragraph>
            <Paragraph>
              Уже сейчас вы можете посмотреть активные игры и оставить на них
              заявку. Также доступен функционал создания персонажей на кастомных
              листах персонажа, которые могут показаться вам удобнее уже
              существующих.
            </Paragraph>
            <Paragraph>
              Также в разделе "Инструменты" вы можете найти различные
              инструменты для мастеров и игроков, которые помогут вам в
              проведении игр. В данный момент реализована актуальная вики для
              домашних правил, а также несколько полезных инструментов для
              гильдийских ваншотов.
            </Paragraph>
          </Typography>
        </Card>

        <div className="w-16 h-1 bg-gray-300 rounded-full my-10" />

        <div className="w-full max-w-5xl">
          <SessionsList master={false} />
        </div>
      </div>
    </div>
  );
};

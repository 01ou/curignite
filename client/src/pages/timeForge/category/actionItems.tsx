import { Abc, BatchPrediction, Bedtime, Book, BorderColor, ContactEmergency, ContentCut, Description, DirectionsBike, DirectionsRun, DirectionsWalk, DirtyLens, Diversity3, Draw, Extension, FitnessCenter, GridOn, History, Hotel, Language, Laptop, LocalDining, LocalMovies, Mic, Movie, MusicNote, Piano, Pool, School, SelfImprovement, Smartphone, Spa, SportsCricket, SportsEsports, SportsGymnastics, Task, Terminal, Tv, YouTube } from "@mui/icons-material";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface Item { id: string; label: string; Image: OverridableComponent<SvgIconTypeMap<{}, "svg">> }

export const trainingItems: Item[] = [
  { id: "homework", label: "宿題", Image: Task },
  { id: "referenceBook", label: "参考書", Image: Book },
  { id: "cramSchool", label: "塾", Image: School },
  { id: "englishWords", label: "英単語", Image: Abc },
  { id: "testPreparation", label: "テスト対策", Image: BorderColor },
  { id: "preview", label: "予習", Image: BatchPrediction },
  { id: "review", label: "復習", Image: History },
  { id: "noteTaking", label: "ノート作成", Image: Description },
  { id: "walking", label: "ウォーキング", Image: DirectionsWalk },
  { id: "running", label: "ランニング", Image: DirectionsRun },
  { id: "strengthTraining", label: "筋トレ", Image: FitnessCenter },
  { id: "swimming", label: "水泳", Image: Pool },
  { id: "cycling", label: "サイクリング", Image: DirectionsBike },
  { id: "yoga", label: "ヨガ", Image: SelfImprovement },
];

export const restItems: Item[] = [
  { id: "gaming", label: "ゲーム", Image: SportsEsports },
  { id: "sns", label: "SNS", Image: Diversity3 },
  { id: "videoWatching", label: "動画視聴", Image: YouTube },
  { id: "browsing", label: "ネット", Image: Language },
  { id: "anime", label: "アニメ", Image: DirtyLens },
  { id: "movie", label: "映画", Image: Movie },
  { id: "drama", label: "ドラマ", Image: ContactEmergency },
  { id: "sportsWatching", label: "スポーツ観戦", Image: SportsCricket },
  { id: "music", label: "音楽", Image: MusicNote },
  { id: "tv", label: "テレビ", Image: Tv },
  { id: "smartphone", label: "スマホ", Image: Smartphone },
  { id: "pc", label: "PC", Image: Laptop },
];

export const creativeItems: Item[] = [
  { id: "drawing", label: "絵", Image: Draw },
  { id: "singing", label: "歌", Image: Mic },
  { id: "composing", label: "作曲", Image: Piano },
  { id: "videoEditing", label: "動画制作", Image: LocalMovies },
  { id: "programming", label: "プログラミング", Image: Terminal },
  { id: "cooking", label: "料理", Image: LocalDining },
  { id: "sewing", label: "裁縫", Image: ContentCut },
  { id: "dancing", label: "ダンス", Image: SportsGymnastics },
  { id: "abstractGame", label: "頭脳ゲーム", Image: GridOn },
  { id: "puzzle", label: "パズル", Image: Extension },
  { id: "meditation", label: "瞑想", Image: Spa },
  { id: "yoga", label: "ヨガ", Image: SelfImprovement },
];

// 学習関連 (trainingItems)
export const trainingIds = [
  "homework",
  "referenceBook",
  "cramSchool",
  "englishWords",
  "testPreparation",
  "preview",
  "review",
  "noteTaking",
  "walking",
  "running",
  "strengthTraining",
  "swimming",
  "cycling",
  "yoga"
];

// 休憩関連 (restItems)
export const restIds = [
  "gaming",
  "sns",
  "videoWatching",
  "browsing",
  "anime",
  "movie",
  "drama",
  "sportsWatching",
  "music",
  "tv",
  "smartphone",
  "pc"
];

// 創作関連 (creativeItems)
export const creativeIds = [
  "drawing",
  "singing",
  "composing",
  "videoEditing",
  "programming",
  "cooking",
  "sewing",
  "dancing",
  "abstractGame",
  "puzzle",
  "meditation"
];


export const actionIconMap: Record<string, OverridableComponent<SvgIconTypeMap<{}, "svg">>> = {
  // trainingItems
  homework: Task,
  referenceBook: Book,
  cramSchool: School,
  englishWords: Abc,
  testPreparation: BorderColor,
  preview: BatchPrediction,
  review: History,
  noteTaking: Description,
  walking: DirectionsWalk,
  running: DirectionsRun,
  strengthTraining: FitnessCenter,
  swimming: Pool,
  cycling: DirectionsBike,
  yoga: SelfImprovement,

  // restItems
  gaming: SportsEsports,
  sns: Diversity3,
  videoWatching: YouTube,
  browsing: Language,
  anime: DirtyLens,
  movie: Movie,
  drama: ContactEmergency,
  sportsWatching: SportsCricket,
  music: MusicNote,
  tv: Tv,
  smartphone: Smartphone,
  pc: Laptop,

  // creativeItems
  drawing: Draw,
  singing: Mic,
  composing: Piano,
  videoEditing: LocalMovies,
  programming: Terminal,
  cooking: LocalDining,
  sewing: ContentCut,
  dancing: SportsGymnastics,
  abstractGame: GridOn,
  puzzle: Extension,
  meditation: Spa,

  // sleep
  nap: Hotel,
  sleep: Bedtime
};
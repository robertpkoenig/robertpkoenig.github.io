BEATS_IN_BAR = 4 // beat means quarter note
BARS_PER_SONG = 4
POSSIBLE_HITS_PER_BEAT = 4 // 16th note quantizing (there are 4 16th notes per beat)
BEATS_PER_MINUTE = 120 // so 2 quarter notes per second, or 8 16th notes per second)
BEATS_PER_SECOND = BEATS_PER_MINUTE / 60
FRAMES_PER_BEAT = 16
FRAMES_PER_HIT = FRAMES_PER_BEAT / POSSIBLE_HITS_PER_BEAT
FRAMES_PER_SECOND = FRAMES_PER_BEAT * BEATS_PER_SECOND
NUM_FRAMES_IN_SONG = BARS_PER_SONG * BEATS_IN_BAR * FRAMES_PER_BEAT
MAX_NUM_HITS_PER_TRACK = BARS_PER_SONG * BEATS_IN_BAR * POSSIBLE_HITS_PER_BEAT
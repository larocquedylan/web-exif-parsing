export const defaultOptions = {
    // Segments (JPEG APP Segment, PNG Chunks, HEIC Boxes, etc...)
    tiff: true,
    xmp: false,
    icc: false,
    iptc: false,
    jfif: false, // (jpeg only)
    ihdr: false, // (png only)
    // Sub-blocks inside TIFF segment
    ifd0: true, // aka image
    ifd1: false, // aka thumbnail
    exif: true,
    gps: true,
    interop: false,
    // Other TIFF tags
    makerNote: false,
    userComment: false,
    // Filters
    skip: [],
    pick: [],
    // Formatters
    translateKeys: true,
    translateValues: true,
    reviveValues: true,
    sanitize: true,
    mergeOutput: true,
    silentErrors: true,
    // Chunked reader
    chunked: true,
    firstChunkSize: undefined,
    firstChunkSizeNode: 512,
    firstChunkSizeBrowser: 65536, // 64kb
    chunkSize: 65536, // 64kb
    chunkLimit: 5,
    httpHeaders: {},
  }
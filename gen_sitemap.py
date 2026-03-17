import os
from dataclasses import dataclass
from enum import Enum

def get_all_subfiles(target_path: str) -> str:
    pathes = []
    for current_dir, sub_dirs, files_list in os.walk(target_path): 
        for file_name in files_list:
                path = os.path.join(current_dir,file_name).replace("\\", "/")
                pathes.append(path)
    
    return pathes

class Symbol:
    def __init__(self, description):
        self.__identify = id(self)
        self.__description = description
    
    def __eq__(self, other):
        if not isinstance(other, Symbol): return False
        return self.__identify == other.__identify
    
    def __repr__(self):
        return f"Symbol(\"{self.__description}\")"
    
    def __str__(self):
        return f"Symbol(\"{self.__description}\")"

class ContentType(Enum):
    html = Symbol("HTML")
    markdown = Symbol("Markdown")

@dataclass
class WebContent:
    type: ContentType
    path: str
    id: str = None

    @staticmethod
    def transform_path_into_WebContent(filepath: str) -> WebContent | None:
        if filepath.endswith(".md") and filepath.startswith("contents/"):
            return WebContent(
                    ContentType.markdown,
                    "ArcaeaBehaviorWiki/contents/",
                    filepath[9:-3] # Exclude strings: "contents/", ".md"
                )
        elif filepath.endswith(".md"): return None
        elif filepath.endswith("index.html"):
            return WebContent(
                ContentType.html,
                "ArcaeaBehaviorWiki/" + filepath[:-10] # Exclude a string: "index.html"
            )
        else:
            return WebContent(
                ContentType.html,
                "ArcaeaBehaviorWiki/" + filepath
            )

if __name__ == "__main__":
    website_URI = "https://miyukinngu.github.io/"

    suffixes = [".md", ".html"]

    # From https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=ja
    baseXML = """<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{}
    </urlset>"""

    patternXML = """
    <url>
        <loc>{}</loc>
    </url>"""
    
    
    all_contents = []
    for file_path in get_all_subfiles("./"):
        for suffix in suffixes:
            if file_path.endswith(suffix):
                all_contents.append(file_path[2::])

    contents_object: list[WebContent] = []
    for file in all_contents:
        webcontent = WebContent.transform_path_into_WebContent(file)
        if file is not None:
            contents_object.append(webcontent)

    relative_URIs = []
    for objects in contents_object:
        if objects.type == ContentType.html:
            relative_URIs.append(objects.path)
        elif objects.type == ContentType.markdown:
            relative_URIs.append(objects.path + "?id=" + objects.id)
        else:
            raise TypeError("Passed unknown type.")

    ignores = set()

    with open("./sitemap-ignores.txt", "r", encoding="utf-8") as f:
        ignores = set(f.readlines())

    relative_URIs = list(filter(lambda o: o not in ignores, relative_URIs))

    register_URIs = list(map(
        lambda uri: website_URI + uri,
        relative_URIs))

    url_tags = []
    for uri in register_URIs:
        formatted_uri = uri \
            .replace("&", "&amp;") \
            .replace("'", "&apos;") \
            .replace('"', "&quot;") \
            .replace(">", "&gt;") \
            .replace("<", "&lt;")
        url_tags.append(patternXML.format(formatted_uri))

    XML_data = baseXML.format("".join(url_tags))

    with open("sitemap.xml", "w", encoding="utf-8") as f:
        f.write(XML_data)
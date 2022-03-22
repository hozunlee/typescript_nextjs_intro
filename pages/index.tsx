import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

import { Character, GetCharacterResults } from "../types";
import imageLoader from "../imgLoader";

const Home: NextPage<{ characters: Character[] }> = ({ characters }) => {
    return (
        <div>
            DB_CONNECT: {process.env.NEXT_PUBLIC_DB_CONNECT}
            <hr />
            {characters.map((character) => {
                return (
                    <div key={character.id}>
                        <Link href={`characters/${character.id}`}>
                            <a>
                                <h3>{character.name}</h3>
                            </a>
                        </Link>

                        <Image
                            loader={imageLoader}
                            unoptimized
                            src={character.image}
                            alt={character.name}
                            width="200"
                            height="200"
                        />
                    </div>
                );
            })}
        </div>
    );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    const { results }: GetCharacterResults = await res.json();

    return {
        props: {
            characters: results,
        },
    };
};

export default Home;
